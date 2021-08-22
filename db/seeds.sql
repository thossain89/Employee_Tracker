INSERT into
  department (department_name)
VALUES
  ('Executive'),
  ('Sales'),
  ('Finance'),
  ('Legal'),
  ('Marketing'),
  ('IT'),
  ('HR');
  
  
INSERT into
  role (title, salary, department_id)
VALUES ('President', 600000, 1),
('CEO', 500000, 1),
('COO', 450000, 1),
('CFO', 400000, 1),
('Executive VP', 350000, 1),
  ('Director of HR', 300000, 1),
  ('Director of Sales', 300000, 1),
  ('Director of Marketing', 300000, 1),
  ('General Counsel', 300000, 1),
  ('Executive Assistant', 250000, 1),
  ('Sales Director', 100000, 2),
  ('Sales Manager', 100000, 2),
  ('Salesperson', 60000, 2),
  ('Sales Assistant', 50000, 2),
  ('Lead Architect', 175000, 6),
  ("Tech Consultant", 90000, 6),
  ("Computer Programmer", 25000, 6),
  ('Lawyer', 130000, 4),
  ('Legal Assistant', 60000, 4),
  ('Accountant', 130000, 3),
  ('HR Manager', 120000, 7),
  ('Marketing Manager', 120000, 5),
  ('Marketing Assistant', 45000, 5),
  ('Secretary', 400000, 7);
  
  
INSERT into
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Chris", "Lude", 1, 1),
  ("Mark", "Withers", 2, 1),
  ("Bob", "Porter", 3, 1),
  ("Stacey", "Greer", 4, 1),
  ("Rakesh", "Agarwal", 5, 1),
  ("Andrew", "Fader", 5, 1),
  ("Emiliy", "Gustafson", 6, 1),
  ("Sarah", "King", 6, 1),
  ("Tobby", "Lumbergh", 7, 1),
  ("Vlad", "Smykowski", 8, 2),
  ("Nina", "Ramon", 9, 2),
  ("Brian", "Duffey", 10, 2),
  ("Adam", "Quiter", 10, 2),
  ("Jim", "Chen", 11, 2),
  ("Nadim", "Olegvasher", 12, 2),
  ("Farhan", "Hasan", 13, 2),
  ("Peter", "Gibbons", 14, 3),
  ("Milton", "Park-ju", 15, 3),
  ("Hitoshi", "Matsudaira", 16, 3),
  ("Indira", "Nagheenanajar", 16, 3),
  ("Nagao", "Kagetora", 17, 3),
  ("Oda", "Nobunaga", 18, 3),
  ("Raymond", "Harambe", 19, 3),
  ("Billy", "Jones", 19, 3);

