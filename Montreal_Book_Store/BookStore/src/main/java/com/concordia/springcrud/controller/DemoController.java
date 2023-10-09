/*
package com.concordia.springcrud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DemoController {

	// create a mapping for "/hello"
	
	@GetMapping("/hello")
	public String sayHello(Model theModel) {
		
		theModel.addAttribute("theDate", new java.util.Date());
		
		return "helloworld";
	}
}
*/

package com.concordia.springcrud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DemoController {

	@GetMapping("/")
	public String showHome() {
		return "Home";
	}
	
	// add a request mapping for /customers
	
		@GetMapping("/customers")
		public String showBooks() {
			
			return "redirect:/books/show";
		}
	
	// add a request mapping for /leaders
	
	@GetMapping("/leaders")
	public String showLeaders() {
		
		return "redirect:/books/list";
	}
	
	// add a request mapping for /systems
	
	@GetMapping("/systems")
	public String showSystems() {
			
		return "systems";
	}
}
