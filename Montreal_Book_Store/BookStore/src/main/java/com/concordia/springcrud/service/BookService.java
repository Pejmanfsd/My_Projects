package com.concordia.springcrud.service;

import java.util.List;


import com.concordia.springcrud.entity.Book;

public interface BookService {

	List<Book> findAll();
	
	Book findById(int theId);
	
	void save(Book theBook);
	
	void deleteById(int theId);
	
}
