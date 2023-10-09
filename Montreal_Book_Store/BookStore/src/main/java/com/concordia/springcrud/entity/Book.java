package com.concordia.springcrud.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="employee")
public class Book {

	// define fields
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="book_name")
	private String bookName;
	
	@Column(name="author_name")
	private String authorName;
	
	@Column(name="isbn")
	private String isbn;
	
		
	// define constructors
	
	public Book() {
		
	}
	
	public Book(int id, String bookName, String authorName, String isbn) {
		this.id = id;
		this.bookName = bookName;
		this.authorName = authorName;
		this.isbn = isbn;
	}


	public Book(String bookName, String authorName, String isbn) {
		this.bookName = bookName;
		this.authorName = authorName;
		this.isbn = isbn;
	}

	// define getter/setter
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	// define tostring

	@Override
	public String toString() {
		return "Employee [id=" + id + ", bookName=" + bookName + ", authorName=" + authorName + ", isbn=" + isbn + "]";
	}
		
}
