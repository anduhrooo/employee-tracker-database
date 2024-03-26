\c employees_db;

INSERT INTO department (name)
VALUES
('management'),
('admin'),
('finance'),
('sales'),
('customer service'),
('human resources');

INSERT INTO role (title, salary, department)
VALUES
('regional manager', 100000, 1), 
('receptionist', 30000, 2),       
('sales representative', 50000, 4)
('accountant', 50000, 3),         
('customer service rep', 40000, 5)
('hr representative', 40000, 6);  

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('michael', 'scott', 1), 
('pam', 'beesly', 2),     
('jim', 'halpert', 3),    
('dwight', 'schrute', 3), 
('meredith', 'palmer', 4),
('toby', 'flenderson', 6),
('stanley', 'hudson', 3), 
('phyllis', 'vance', 3),  
('oscar', 'martinez', 4), 
('angela', 'martin', 5),  
('kevin', 'malone', 5),   
('andy', 'bernard', 3),   
('creed', 'bratton', 2),  
('ryan', 'howard', 3),    
('kelly', 'kapoor', 5);   

