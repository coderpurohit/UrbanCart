import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL!;
const sql = neon(databaseUrl);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { table, action, data, filters, order, limit, join, single } = body;

    if (!table) {
      return NextResponse.json({ error: 'Table is required' }, { status: 400 });
    }

    // 1. SELECT Action
    if (action === 'select') {
      let queryStr = '';
      const params: any[] = [];
      let paramCount = 1;

      if (table === 'cart' && join === 'products') {
        // Special case: Cart join with Products
        queryStr = `
          SELECT cart.*, row_to_json(products) as products 
          FROM cart 
          LEFT JOIN products ON cart.product_id = products.id
        `;
      } else {
        queryStr = `SELECT * FROM ${table}`;
      }

      // Filters (Array structure: [{ column, operator, value }])
      if (filters && filters.length > 0) {
        const filterClauses = [];
        for (const f of filters) {
          const { column, operator, value } = f;
          if (value === null) {
            filterClauses.push(`${table}.${column} IS NULL`);
          } else if (operator === 'ilike') {
            filterClauses.push(`${table}.${column} ILIKE $${paramCount}`);
            params.push(value);
            paramCount++;
          } else {
            filterClauses.push(`${table}.${column} = $${paramCount}`);
            params.push(value);
            paramCount++;
          }
        }
        queryStr += ` WHERE ${filterClauses.join(' AND ')}`;
      }

      // Order
      if (order) {
        const { column, ascending } = order;
        queryStr += ` ORDER BY ${table}.${column} ${ascending ? 'ASC' : 'DESC'}`;
      }

      // Limit
      if (limit) {
        queryStr += ` LIMIT ${limit}`;
      }

      const rows = await sql.query(queryStr, params);
      
      if (single) {
        return NextResponse.json({ data: rows[0] || null });
      }
      return NextResponse.json({ data: rows });
    }

    // 2. INSERT Action
    if (action === 'insert') {
      const records = Array.isArray(data) ? data : [data];
      if (records.length === 0) {
        return NextResponse.json({ data: [] });
      }

      const columns = Object.keys(records[0]);
      const valuePlaceholders = [];
      const params: any[] = [];
      let paramCount = 1;

      for (const record of records) {
        const placeholders = [];
        for (const col of columns) {
          placeholders.push(`$${paramCount}`);
          params.push(record[col]);
          paramCount++;
        }
        valuePlaceholders.push(`(${placeholders.join(', ')})`);
      }

      const queryStr = `
        INSERT INTO ${table} (${columns.join(', ')}) 
        VALUES ${valuePlaceholders.join(', ')} 
        RETURNING *
      `;

      const rows = await sql.query(queryStr, params);
      return NextResponse.json({ data: rows });
    }

    // 3. UPDATE Action
    if (action === 'update') {
      const columns = Object.keys(data);
      const setClauses = [];
      const params: any[] = [];
      let paramCount = 1;

      for (const col of columns) {
        setClauses.push(`${col} = $${paramCount}`);
        params.push(data[col]);
        paramCount++;
      }

      let queryStr = `UPDATE ${table} SET ${setClauses.join(', ')}`;

      // Filters
      if (filters && filters.length > 0) {
        const filterClauses = [];
        for (const f of filters) {
          const { column, operator, value } = f;
          if (operator === 'ilike') {
            filterClauses.push(`${column} ILIKE $${paramCount}`);
          } else {
            filterClauses.push(`${column} = $${paramCount}`);
          }
          params.push(value);
          paramCount++;
        }
        queryStr += ` WHERE ${filterClauses.join(' AND ')}`;
      }

      queryStr += ` RETURNING *`;

      const rows = await sql.query(queryStr, params);
      return NextResponse.json({ data: rows });
    }

    // 4. DELETE Action
    if (action === 'delete') {
      let queryStr = `DELETE FROM ${table}`;
      const params: any[] = [];
      let paramCount = 1;

      if (filters && filters.length > 0) {
        const filterClauses = [];
        for (const f of filters) {
          const { column, operator, value } = f;
          if (operator === 'ilike') {
            filterClauses.push(`${column} ILIKE $${paramCount}`);
          } else {
            filterClauses.push(`${column} = $${paramCount}`);
          }
          params.push(value);
          paramCount++;
        }
        queryStr += ` WHERE ${filterClauses.join(' AND ')}`;
      }

      queryStr += ` RETURNING *`;

      const rows = await sql.query(queryStr, params);
      return NextResponse.json({ data: rows });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error("Database endpoint error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
