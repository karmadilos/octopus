create table if not exists user(
    id int not null AUTO_INCREMENT,
    username varchar(32) not null,
    email varchar(64) not null,
    password varchar(128) not null,
    descriptions varchar(255),
    primary key(id),
    unique(email)
);

create table if not exists educations_info(
    id int not null AUTO_INCREMENT,
    school text not null,
    major text not null,
    degree tinyint not null,
    user_id int not null,
    primary key (id),
    foreign key (user_id) references user(id)
);

create table if not exists awards_info(
    id int not null AUTO_INCREMENT,
    award text not null,
    summary text,
    user_id int not null,
    primary key (id),
    foreign key (user_id) references user(id)
);

create table if not exists projects_info(
    id int not null AUTO_INCREMENT,
    project text not null,
    summary text,
    date_start date,
    date_end date,
    user_id int not null,
    primary key (id),
    foreign key (user_id) references user(id)
);

create table if not exists certifications_info(
    id int not null AUTO_INCREMENT,
    certification text not null,
    organization text not null,
    date_validate date,
    user_id int not null,
    primary key (id),
    foreign key (user_id) references user(id)
);