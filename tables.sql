create table towns(
	id serial not null primary key,
	town_name text not null,
    regstring text not null 
);


create table registrations(
    id serial not null primary key,
	foreign_id int,
    regnumber text not null,
    foreign key (foreign_id) references towns(id)
);

INSERT  INTO towns (town_name, regstring) VALUES ('Cape Town', 'CA');
INSERT  INTO towns (town_name, regstring) VALUES ('Belleville', 'CY');
INSERT  INTO towns (town_name, regstring) VALUES ('Caledon', 'CK');
