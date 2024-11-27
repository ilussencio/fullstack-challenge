-- CREATE TABLE DRIVER
CREATE TABLE IF NOT EXISTS driver (
    driver_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    vehicle VARCHAR(255) NOT NULL,
    rate DECIMAL NOT NULL,
    minKm INTEGER not NULL
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT null UNIQUE
);

CREATE TABLE IF NOT EXISTS travel (
    travel_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    distance DECIMAL NOT NULL,
    duration VARCHAR(255) NOT NULL,
    driver_id INTEGER NOT NULL,
    value DECIMAL NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id)
);

CREATE TABLE IF NOT EXISTS review (
    review_id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    comment VARCHAR(255) NOT NULL,
    driver_id INTEGER NOT NULL,
    travel_id INTEGER NOT NULL,
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
    FOREIGN KEY (travel_id) REFERENCES travel(travel_id)
);

ALTER TABLE travel ADD COLUMN IF NOT EXISTS date TIMESTAMP;


INSERT INTO driver (name, description, vehicle, rate, minKm) VALUES
('John Doe', 'Motorista experiente com ótimas avaliações.', 'Toyota Corolla', 4.5, 10),
('Jane Smith', 'Especialista em viagens de longa distância.', 'Honda Civic', 4.7, 15),
('Michael Brown', 'Motorista amigável, fluente em vários idiomas.', 'Nissan Altima', 4.6, 3),
('Emily Johnson', 'Conhecida pela pontualidade e veículos limpos.', 'Hyundai Elantra', 4.8, 8),
('Chris Williams', 'Adora explorar rotas cênicas.', 'Ford Focus', 4.3, 20),
('Sarah Davis', 'Especialista em navegação no trânsito da cidade.', 'Chevrolet Malibu', 4.9, 5),
('David Wilson', 'Ótimo com famílias e crianças.', 'Kia Optima', 4.4, 10),
('Sophia Martinez', 'Altamente recomendada para viagens de negócios.', 'Volkswagen Passat', 4.6, 10),
('Daniel Garcia', 'Calmo e paciente, ótimo para passageiros idosos.', 'Mazda 3', 4.7, 9),
('Olivia Anderson', 'Especialista em traslados para aeroportos.', 'Subaru Impreza', 4.8, 12),
('James Lee', 'Especialista em turnos noturnos.', 'Toyota Prius', 4.5, 7),
('Emma Thomas', 'Entusiasta de viagens de aventura.', 'Jeep Cherokee', 4.6, 25),
('Liam Harris', 'Motorista seguro com ótimas avaliações.', 'BMW 3 Series', 4.9, 8),
('Ava Lewis', 'Amigável e conversadora.', 'Audi A4', 4.4, 10),
('Mason Clark', 'Conhecido por oferecer viagens luxuosas.', 'Mercedes-Benz C-Class', 4.7, 2),
('Isabella Walker', 'Especialista em rotas de áreas rurais.', 'Ford Escape', 4.5, 15),
('Ethan Robinson', 'Motorista tech-savvy com várias comodidades.', 'Tesla Model 3', 5.0, 5),
('Mia Young', 'Ótima para navegação em áreas centrais.', 'Mini Cooper', 4.8, 7),
('Alexander King', 'Oferece viagens pet-friendly.', 'Chevrolet Equinox', 4.6, 1),
('Charlotte Wright', 'Profissional e confiável.', 'Toyota RAV4', 4.7, 10),
('Benjamin Hill', 'Possui excelente conhecimento local.', 'Honda CR-V', 4.6, 12),
('Amelia Scott', 'Adora passeios cênicos e conversas.', 'Ford Explorer', 4.5, 20),
('Elijah Green', 'Flexível e acolhedor.', 'Dodge Charger', 4.8, 9),
('Harper Adams', 'Focado em viagens ecológicas.', 'Toyota Camry Hybrid', 4.7, 8),
('Logan Baker', 'Especialista em viagens de longa distância.', 'Volkswagen Jetta', 4.5, 1),
('Abigail Nelson', 'Paciente e ótima para explorar novas áreas.', 'Hyundai Tucson', 4.6, 11),
('Lucas Carter', 'Ótimo para eventos corporativos.', 'Lexus RX', 4.8, 7),
('Avery Mitchell', 'Especialista em traslados matinais.', 'Mazda CX-5', 4.7, 8),
('Ella Perez', 'Flexível com horários apertados.', 'Subaru Forester', 4.8, 6),
('Henry Roberts', 'Ótimo para lidar com tráfego intenso.', 'Jeep Compass', 4.6, 10),
('Evelyn Turner', 'Conhecida por retiradas rápidas.', 'Chevrolet Trailblazer', 4.7, 9),
('Jack Phillips', 'Oferece viagens suaves e relaxantes.', 'Buick Encore', 4.4, 15),
('Sofia Campbell', 'Ótima para viagens em família.', 'Ford Edge', 4.6, 12),
('Oliver Parker', 'Pontual e detalhista.', 'Honda Accord', 4.7, 10),
('Luna Evans', 'Proporciona excelentes experiências em viagens.', 'Toyota Highlander', 4.8, 2),
('William Edwards', 'Especialista em dirigir à noite.', 'Nissan Rogue', 4.5, 9),
('Isabella Stewart', 'Paciente e calma sob pressão.', 'Hyundai Santa Fe', 4.6, 10),
('James Collins', 'Sempre pontual.', 'Kia Sportage', 4.9, 7),
('Emily Morris', 'Ótima para viagens rápidas pela cidade.', 'Volkswagen Tiguan', 4.8, 3),
('Mason Rogers', 'Oferece comodidades como água e lanches.', 'Audi Q5', 4.7, 10),
('Chloe Reed', 'Especialista em viagens durante feriados.', 'Jeep Grand Cherokee', 4.6, 18),
('Ethan Howard', 'Motorista preocupado com o meio ambiente.', 'Hyundai Ioniq', 4.7, 6),
('Mia Cox', 'Excelente conhecimento sobre atrações locais.', 'Toyota Tacoma', 4.5, 12),
('Alexander Ward', 'Especialista em viagens luxuosas.', 'Cadillac XT5', 4.8, 10),
('Charlotte Peterson', 'Oferece viagens tranquilas.', 'Chevrolet Traverse', 4.6, 2),
('Benjamin Bailey', 'Ótimo com estudantes.', 'Subaru Crosstrek', 4.7, 6),
('Ava Cooper', 'Flexível e atenciosa.', 'Toyota Yaris', 4.8, 5),
('Liam Richardson', 'Sempre alegre e acolhedor.', 'Honda Pilot', 4.9, 9),
('Sophia Ramirez', 'Motorista profissional com ótimas avaliações.', 'Ford F-150', 4.7, 15),
('Lucas Ilussencio da Silva', 'Motorista Muito Bonito', 'Gol G6', 3, 1);