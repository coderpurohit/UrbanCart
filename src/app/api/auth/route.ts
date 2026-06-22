import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const databaseUrl = process.env.DATABASE_URL!;
const sql = neon(databaseUrl);

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, name, phone } = body;

    if (action === 'signup') {
      // Check if user exists
      const existing = await sql.query("SELECT * FROM users WHERE email = $1", [email]);
      if (existing.length > 0) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      const hashedPassword = hashPassword(password);
      const userResult = await sql.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword]
      );
      const user = userResult[0];

      // Create profile
      await sql.query(
        "INSERT INTO profiles (id, name, phone) VALUES ($1, $2, $3)",
        [user.id, name || email.split('@')[0], phone || '']
      );

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('urban_cart_session', user.id, { httpOnly: true, secure: true, path: '/' });

      return NextResponse.json({ user });
    }

    if (action === 'signin') {
      const userResult = await sql.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userResult.length === 0) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
      }

      const user = userResult[0];
      const valid = verifyPassword(password, user.password);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
      }

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('urban_cart_session', user.id, { httpOnly: true, secure: true, path: '/' });

      return NextResponse.json({ user: { id: user.id, email: user.email } });
    }

    if (action === 'signout') {
      const cookieStore = await cookies();
      cookieStore.set('urban_cart_session', '', { maxAge: 0, path: '/' });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error("Auth error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('urban_cart_session')?.value;
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const userResult = await sql.query("SELECT id, email FROM users WHERE id = $1", [session]);
    if (userResult.length === 0) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: userResult[0] });
  } catch (err: any) {
    console.error("Get user error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
