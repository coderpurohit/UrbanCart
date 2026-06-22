type Filter = {
  column: string;
  operator: 'eq' | 'ilike';
  value: any;
};

type QueryState = {
  table: string;
  action: 'select' | 'insert' | 'update' | 'delete';
  data?: any;
  filters: Filter[];
  order?: { column: string; ascending: boolean };
  limit?: number;
  join?: string;
  single?: boolean;
};

class SingleQueryBuilder<T> {
  private state: QueryState;

  constructor(state: QueryState) {
    this.state = state;
  }

  async execute(): Promise<{ data: T | null; error: { message: string } | null }> {
    try {
      const res = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      });
      const result = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: result.error || 'Database error' } };
      }
      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  then(
    onfulfilled?: (value: { data: T | null; error: { message: string } | null }) => any,
    onrejected?: (reason: any) => any
  ) {
    return this.execute().then(onfulfilled, onrejected);
  }
}

class QueryBuilder<T = any> {
  private state: QueryState;

  constructor(table: string) {
    this.state = {
      table,
      action: 'select',
      filters: [],
    };
  }

  select(fields = '*') {
    if (fields.includes('products')) {
      this.state.join = 'products';
    }
    return this;
  }

  insert(data: any) {
    this.state.action = 'insert';
    this.state.data = data;
    return this;
  }

  update(data: any) {
    this.state.action = 'update';
    this.state.data = data;
    return this;
  }

  delete() {
    this.state.action = 'delete';
    return this;
  }

  eq(column: string, value: any) {
    this.state.filters.push({ column, operator: 'eq', value });
    return this;
  }

  ilike(column: string, pattern: string) {
    this.state.filters.push({ column, operator: 'ilike', value: pattern });
    return this;
  }

  order(column: string, options?: { ascending: boolean }) {
    this.state.order = {
      column,
      ascending: options?.ascending ?? true,
    };
    return this;
  }

  limit(limitNum: number) {
    this.state.limit = limitNum;
    return this;
  }

  single() {
    this.state.single = true;
    return new SingleQueryBuilder<T>(this.state);
  }

  async execute(): Promise<{ data: T[] | null; error: { message: string } | null }> {
    try {
      const res = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      });
      const result = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: result.error || 'Database error' } };
      }
      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  then(
    onfulfilled?: (value: { data: T[] | null; error: { message: string } | null }) => any,
    onrejected?: (reason: any) => any
  ) {
    return this.execute().then(onfulfilled, onrejected);
  }
}

// Auth event listeners
const authListeners = new Set<(event: string, session: any) => void>();

function triggerAuthChange(event: string, user: any) {
  const session = user ? { user, access_token: 'dummy' } : null;
  authListeners.forEach(cb => {
    try {
      cb(event, session);
    } catch (e) {
      console.error("Auth listener error:", e);
    }
  });
}

// Check local storage for initial user state on client side
let cachedUser: any = null;
if (typeof window !== 'undefined') {
  const storedId = localStorage.getItem('urban_cart_user_id');
  if (storedId) {
    cachedUser = { id: storedId };
  }
}

export const isSupabaseConfigured = true; // Neon DB backend is active

interface SupabaseClient {
  auth: {
    getUser(): Promise<{ data: { user: any }; error: any }>;
    signUp(credentials: { email: string; password?: string }): Promise<{ data: { user: any }; error: any }>;
    signInWithPassword(credentials: { email: string; password?: string }): Promise<{ data: { user: any; session?: any }; error: any }>;
    signOut(): Promise<{ error: any }>;
    onAuthStateChange(callback: (event: string, session: any) => void): { data: { subscription: { unsubscribe(): void } } };
  };
  from(table: 'products'): QueryBuilder<Product>;
  from(table: 'cart'): QueryBuilder<CartItem>;
  from(table: 'profiles'): QueryBuilder<UserProfile>;
  from(table: 'notifications'): QueryBuilder<NotificationItem>;
  from(table: string): QueryBuilder<any>;
}

export const supabase: SupabaseClient = {
  auth: {
    async getUser() {
      try {
        const res = await fetch('/api/auth');
        const data = await res.json();
        if (data.user) {
          cachedUser = data.user;
          if (typeof window !== 'undefined') {
            localStorage.setItem('urban_cart_user_id', data.user.id);
          }
          return { data: { user: data.user }, error: null };
        }
        return { data: { user: null }, error: null };
      } catch (err: any) {
        if (cachedUser) {
          return { data: { user: cachedUser }, error: null };
        }
        return { data: { user: null }, error: { message: err.message } };
      }
    },

    async signUp(credentials: { email: string; password?: string }) {
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'signup',
            email: credentials.email,
            password: credentials.password
          })
        });
        const data = await res.json();
        if (!res.ok) {
          return { data: { user: null }, error: { message: data.error || 'Signup failed' } };
        }
        cachedUser = data.user;
        if (typeof window !== 'undefined') {
          localStorage.setItem('urban_cart_user_id', data.user.id);
        }
        triggerAuthChange('SIGNED_IN', data.user);
        return { data: { user: data.user }, error: null };
      } catch (err: any) {
        return { data: { user: null }, error: { message: err.message } };
      }
    },

    async signInWithPassword(credentials: { email: string; password?: string }) {
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'signin',
            email: credentials.email,
            password: credentials.password
          })
        });
        const data = await res.json();
        if (!res.ok) {
          return { data: { user: null }, error: { message: data.error || 'Signin failed' } };
        }
        cachedUser = data.user;
        if (typeof window !== 'undefined') {
          localStorage.setItem('urban_cart_user_id', data.user.id);
        }
        triggerAuthChange('SIGNED_IN', data.user);
        return { data: { user: data.user, session: { user: data.user } }, error: null };
      } catch (err: any) {
        return { data: { user: null }, error: { message: err.message } };
      }
    },

    async signOut() {
      try {
        await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'signout' })
        });
      } catch (err) {
        console.error("Signout call failed", err);
      }
      cachedUser = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('urban_cart_user_id');
      }
      triggerAuthChange('SIGNED_OUT', null);
      return { error: null };
    },

    onAuthStateChange(callback: (event: string, session: any) => void) {
      authListeners.add(callback);
      
      const initialSession = cachedUser ? { user: cachedUser } : null;
      setTimeout(() => {
        callback('INITIAL_SESSION', initialSession);
      }, 0);

      return {
        data: {
          subscription: {
            unsubscribe() {
              authListeners.delete(callback);
            }
          }
        }
      };
    }
  },

  from(table: string) {
    return new QueryBuilder(table);
  }
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  unit: string;
  delivery_time: string;
};

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  user_id: string | null;
  products?: Product;
};

export type UserProfile = {
  id: string;
  name: string;
  phone: string;
  address_label: string;
  address_line: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  read: boolean;
  user_id: string;
};
