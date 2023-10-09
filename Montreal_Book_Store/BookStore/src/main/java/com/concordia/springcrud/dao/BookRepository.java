package com.concordia.springcrud.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import com.concordia.springcrud.entity.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {

	// that's it ... no need to write any code LOL!
	
}
