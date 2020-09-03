# its_itchy

 Requirements:
	•	The products in the list are to be fetched from an endpoint available at https://mock.itsitchy.com/products 
	•	All content should be enclosed in a ScrollView, except for the button which will sit absolute on top of the content at the bottom of the screen. 
	•	When pressing a product card, the card should be marked. Pressing a marked card will remove the marking. 
	•	When the add to cart button is pressed, all marked cards will be added to the Shopping cart section. 
	•	Any cards in the shopping cart section should be greyed out, and have their click actions disabled. 
	•	Pressing the delete button will remove an item from the cart and immediately make it available in the list of products. 
	•	The list of products should be sorted with the disabled items (items in the cart) at the bottom. 
	•	Counters should increment and decrement appropriately. 
	•	The dark blue part of the progress bar should grow depending on the amount of products in the shopping cart. 
	•	The “Add to cart” button should be disabled if the shopping cart is full, or if the amount of products selected won’t fit in the cart. 

Bonus points:
	•	Make the shopping cart item bar animate smoothly when filling the cart with items. 
	•	Use LayoutAnimation to make the sorting of the product list fluid.   

TODO's: 
- The parent component "User" is really code heavy and needs to be organised in a better way for it to be more readable. Refactoring is needed. 
