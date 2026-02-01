-- Clear existing products (Cascade to cart if needed, or just clear cart too)
TRUNCATE products CASCADE;

-- Insert Comprehensive Product List
INSERT INTO products (name, price, category, image, unit, delivery_time) VALUES
  -- BAKERY (Variety of breads)
  ('Whole Wheat Bread', 45, 'Bakery', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80', '400 g', '8 MINS'),
  ('White Sandwich Bread', 35, 'Bakery', 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=500&q=80', '400 g', '8 MINS'),
  ('Garlic Bread', 85, 'Bakery', 'https://images.unsplash.com/photo-1573140247632-f84660f67627?auto=format&fit=crop&w=500&q=80', '250 g', '15 MINS'),
  ('Pav Buns', 30, 'Bakery', 'https://images.unsplash.com/photo-1589367920974-d66e7e1140df?auto=format&fit=crop&w=500&q=80', '6 pcs', '8 MINS'),

  -- BEVERAGES
  ('Coca Cola', 40, 'Beverages', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80', '750 ml', '8 MINS'),
  ('Orange Juice', 120, 'Beverages', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=500&q=80', '1 L', '8 MINS'),
  ('Sprite Can', 35, 'Beverages', 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=500&q=80', '300 ml', '8 MINS'),
  ('Apple Juice', 110, 'Beverages', 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=500&q=80', '1 L', '8 MINS'),

  -- BISCUITS
  ('Oreo Cookies', 30, 'Biscuits', 'https://images.unsplash.com/photo-1569091721849-7d4d8e330945?auto=format&fit=crop&w=500&q=80', '120 g', '8 MINS'),
  ('Digestive Biscuits', 45, 'Biscuits', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80', '250 g', '8 MINS'),
  ('Choco Chip Cookies', 60, 'Biscuits', 'https://images.unsplash.com/photo-1499636138143-bd630f5cf386?auto=format&fit=crop&w=500&q=80', '200 g', '8 MINS'),

  -- BREAKFAST
  ('Corn Flakes', 140, 'Breakfast', 'https://images.unsplash.com/photo-1588610334800-4183d2524d77?auto=format&fit=crop&w=500&q=80', '475 g', '8 MINS'),
  ('Rolled Oats', 95, 'Breakfast', 'https://images.unsplash.com/photo-1517441221711-4777d077dff4?auto=format&fit=crop&w=500&q=80', '1 kg', '8 MINS'),
  ('Muesli Fruit & Nut', 190, 'Breakfast', 'https://images.unsplash.com/photo-1590393864115-cb282126f584?auto=format&fit=crop&w=500&q=80', '400 g', '8 MINS'),

  -- COFFEE
  ('Instant Coffee', 180, 'Coffee', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80', '100 g', '8 MINS'),
  ('Filter Coffee Powder', 90, 'Coffee', 'https://images.unsplash.com/photo-1559495759-b54174092497?auto=format&fit=crop&w=500&q=80', '250 g', '8 MINS'),
  ('Roasted Coffee Beans', 350, 'Coffee', 'https://images.unsplash.com/photo-1611854779393-1b2ae9e0339c?auto=format&fit=crop&w=500&q=80', '500 g', '8 MINS'),

  -- FOOD (Meals)
  ('Healthy Salad Bowl', 150, 'Food', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80', '1 serving', '30 MINS'),
  ('Veg Biryani', 220, 'Food', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80', '1 serving', '45 MINS'),
  ('Paneer Sandwich', 120, 'Food', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80', '1 pc', '30 MINS'),

  -- FROZEN
  ('Ice Cream Scoops', 250, 'Frozen', 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=500&q=80', '500 ml', '15 MINS'),
  ('Frozen Green Peas', 80, 'Frozen', 'https://images.unsplash.com/photo-1587311749830-1c217730e704?auto=format&fit=crop&w=500&q=80', '500 g', '20 MINS'),
  ('French Fries', 110, 'Frozen', 'https://images.unsplash.com/photo-1630384060421-2c08e8b2b64d?auto=format&fit=crop&w=500&q=80', '400 g', '20 MINS'),

  -- DAIRY
  ('Farm Fresh Milk', 27, 'Dairy', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80', '500 ml', '8 MINS'),
  ('Fresh Paneer', 95, 'Dairy', 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=500&q=80', '200 g', '8 MINS'),
  ('Salted Butter', 58, 'Dairy', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80', '100 g', '8 MINS'),
  ('Cheese Slices', 115, 'Dairy', 'https://images.unsplash.com/photo-1624806080274-9f5068612e56?auto=format&fit=crop&w=500&q=80', '10 slices', '8 MINS'),

  -- FRUITS (Fixed Mango/Banana issue)
  ('Fresh Mangoes', 120, 'Fruits', 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=500&q=80', '1 dozen', '8 MINS'),
  ('Robusta Banana', 60, 'Fruits', 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=500&q=80', '1 dozen', '8 MINS'),
  ('Red Apples', 140, 'Fruits', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=500&q=80', '1 kg', '8 MINS'),
  ('Green Grapes', 90, 'Fruits', 'https://images.unsplash.com/photo-1537640538965-1756299f2d18?auto=format&fit=crop&w=500&q=80', '500 g', '8 MINS'),

  -- INSTANT
  ('Maggi Noodles', 14, 'Instant', 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=500&q=80', '70 g', '8 MINS'),
  ('Cup Noodles', 50, 'Instant', 'https://images.unsplash.com/photo-1627379523258-2022d10697d8?auto=format&fit=crop&w=500&q=80', '1 cup', '8 MINS'),
  ('Instant Pasta', 45, 'Instant', 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=500&q=80', '1 pack', '8 MINS');
