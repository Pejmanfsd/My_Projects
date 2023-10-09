package com.concordia.springcrud.controller;

import com.concordia.springcrud.entity.Book;
import com.concordia.springcrud.service.BookService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/books")
public class BookController {

	private BookService bookService;
	public BookController(BookService theBookService) {
		bookService = theBookService;
	}

	// add mapping for "/list"

	@GetMapping("/list")
	public String listBooks(Model theModel) {

		// get the book from db
		List<Book> theBook = bookService.findAll();
		
		theModel.addAttribute("employees", theBook);

		return "books/list-books";
	}
	
	@GetMapping("/show")
	public String showBooks(Model theModel) {

		// get the book from db
		List<Book> theBook = bookService.findAll();
		
		theModel.addAttribute("employees", theBook);

		return "books/show-books";
	}
	
	@GetMapping("/showFormForAdd")
	public String showFormForAdd(Model theModel) {
		
		Book theBook = new Book();
		theModel.addAttribute("employee", theBook);
		return "books/book-form";
	}
	
	@GetMapping("/showFormForUpdate")
	public String showFormForUpdate(@RequestParam("employeeId") int theId, Model theModel) {
		
		// get the employee from the service
		Book theBook = bookService.findById(theId);
		
		// set employee as a model attribute to pre-populate the form
		theModel.addAttribute("employee", theBook);
		
		// send over to our form
		return "books/book-form";
	}
	
	@PostMapping("/save")
	public String saveEmployee(@ModelAttribute("employee") Book theBook) {
		bookService.save(theBook);
		return "redirect:/books/list";
	}
	
	@GetMapping("/delete")
	public String delete(@RequestParam("employeeId") int theId) {
		
		// delete the book
		bookService.deleteById(theId);
		
		// redirect to list
		return "redirect:/books/list";
	}
}