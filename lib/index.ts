import * as rp from 'request-promise-native';
import {Options} from "request-promise-native";

export class PaprikaApi {
	private email: string;
	private password: string;

	private baseUrl: string = "https://www.paprikaapp.com/api/v1/sync/";

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}

	private resource(endpoint: string): Promise<any> {
		let options: Options = {
			auth: {
				user: this.email,
				pass: this.password
			},
			method: 'GET',
			baseUrl: this.baseUrl,
			uri: endpoint,
			json: true,
			headers: {
				'User-Agent': 'PaprikaApi NodeJS library'
			},
			transform(body: any) {
				return body.result;
			}
		};
		return rp(options)
	}

	public bookmarks(): Promise<Bookmark[]> {
		return this.resource('bookmarks');
	}

	public categories(): Promise<Category[]> {
		return this.resource('categories');
	}

	public groceries(): Promise<GroceryItem[]> {
		return this.resource('groceries');
	}

	public meals(): Promise<Meal[]> {
		return this.resource('meals');
	}

	public menus(): Promise<Menu[]> {
		return this.resource('menus');
	}

	public menuItems(): Promise<MenuItem[]> {
		return this.resource('menuitems');
	}

	public pantry(): Promise<PantryItem[]> {
		return this.resource('pantry');
	}

	public recipes(): Promise<RecipeItem[]> {
		return this.resource('recipes');
	}

	public recipe(recipeUid: string): Promise<Recipe> {
		return this.resource('recipe/' + recipeUid);
	}

	public status(): Promise<Status> {
		return this.resource('status');
	}
}

/*
Example:
{
	"url": "http://www.bhg.com",
	"title": "Better Homes And Gardens",
	"uid": "B3720738-99AA-4C39-9FC3-C722B652A0AA-74627-00009CB4D8512255",
	"order_flag": 2
}
 */
export interface Bookmark {
	url: string;
	title: string;
	uid: string;
	order_flag: number;
}

/*
Example:
{
	"name": "Slow Cooker",
	"uid": "EAB93087-1223-46F2-B446-9DE35F3A6A77-22290-000009AC5FA468F3",
	"parent_uid": null,
	"order_flag": 3
}
 */
export interface Category {
	name: string;
	uid: string;
	parent_uid: string;
	order_flag: number;
}

/*
Example:
{
	"aisle": "Canned and Jar Goods",
	"uid": "9BCFF05C-0F7B-4FFF-86D3-D2BE5C1D7929-48366-0000A4DFB7FDB35D",
	"order_flag": 5,
	"recipe": "Camp David Spaghetti with Italian Sausage",
	"name": "1 (14.5 ounce) can whole peeled tomatoes",
	"purchased": true,
	"recipe_uid": null,
	"ingredient": "tomato"
}
 */
export interface GroceryItem {
	aisle: string;
	uid: string;
	order_flag: number;
	recipe: string;
	name: string;
	purchased: boolean;
	recipe_uid: string;
	ingredient: string;
}

/*
Example:
{
	"uid": "076F5D03-FF83-4853-A4AF-F18D3B90B534-48366-0000A4B3B683F476",
	"order_flag": 1,
	"recipe_uid": "47C4A0F9-D1C9-47C4-B857-64528596D9D5-6878-000002BBAB789EAE",
	"date": "2015-05-27 00:00:00",
	"type": 2,
	"name": "Chicken Fettuccini Alfredo"
}
 */
export interface Meal {
	uid: string;
	order_flag: number;
	recipe_uid: string;
	date: string;
	type: number;
	name: string;
}

/*
Example:
{
	"notes": "",
	"uid": "15D146C9-268A-4DFD-A66C-DCD5B3AC0ACF-49283-00009A5A2CBB4A41",
	"name": "Test Menu",
	"order_flag": 1
}
 */
export interface Menu {
	notes: string;
	uid: string;
	name: string;
	order_flag: number;
}

/*
Example:
{
	"name": "(I Can't Believe It's) Mashed Cauliflower",
	"recipe_uid": "BD873BDF-E376-4E34-8866-448BC7D50FD1-13282-000004B2D21C7A27",
	"uid": "044ACEFF-4C47-4E70-88FD-3EFF668FB34D-49283-00009A5E01701B65",
	"menu_uid": "15D146C9-268A-4DFD-A66C-DCD5B3AC0ACF-49283-00009A5A2CBB4A41",
	"order_flag": 1
}
 */
export interface MenuItem {
	name: string;
	recipe_uid: string;
	uid: string;
	menu_uid: string;
	order_flag: number;
}

/*
Example:
{
	"aisle": "Oils and Dressings",
	"uid": "370850E8-7915-4C63-8755-7DD23C0E3ECA-49283-00009C563D097E3C",
	"ingredient": "1000 island"
}
 */
export interface PantryItem {
	aisle: string;
	uid: string;
	ingredient: string;
}

/*
Example:
{
	"rating": 5,
	"photo_hash": "9c091461749b72d8c889be220eac2aa05abc986e608c9bdb7a21b09b982e417e",
	"on_favorites": false,
	"photo": "389D470F-E400-471E-8CB2-4B3C51FFDB93-7486-000003FF2696F47B.jpg",
	"uid": "9E81A5D2-B445-4BB3-AE19-B2113F276BE8-7486-000003FF2696C444",
	"scale": null,
	"ingredients": "One pound ground (raw) chicken breast - about 3 small boneless breasts, chopped in food processor\n½ cup grated Parmesan\n1 cup freshly shredded part skim mozzarella\n½ teaspoon garlic powder\nSea salt and freshly ground black pepper\nDried oregano\n½ cup prepared pasta sauce\nCrushed red pepper flakes\n4 or 5 basil leaves, rolled and sliced\nToppings - lets not go crazy with fat - I used Molinari very lean pepperoni in paper thin slices",
	"source": "Bariatriceating.com",
	"hash": "c5f7e6c1304a07637c6ef50a5ef14f4c0b0a13a206f10008f28f0483d555b4e7",
	"source_url": "http://www.bariatriceating.com/2015/07/chicken-crust-pizza-nocarbpizza-bariatricpizza/",
	"difficulty": "Easy",
	"on_grocery_list": null,
	"directions": "Preheat oven to 450°F and line a baking sheet or pizza pan with parchment paper or foil sprayed with non stick vegetable cooking spray.\n\nIn a medium bowl combine the ground chicken with ¼ cup parmesan, ¼ cup mozzarella, ½ teaspoon salt, ¼ teaspoon black pepper, ½ teaspoon garlic powder and ½ teaspoon oregano.\n\nMound the chicken mixture onto the parchment and pat into flat rectangle or disc. Cover with plastic wrap and evenly press or roll the chicken into a 7x10\" rectangle or round. I use a rolling pin! Remove the plastic wrap and roast until golden, 12 to 15 minutes.\n\nSmear crust with sauce, scatter with ¼ cup Parmesan, ¾ cup mozzarella, layer with toppings and season with a sprinkle of crushed red pepper flakes and ¼ teaspoon oregano.\n\nPop back into hot oven and cook until melted and bubbly 6 to 10 minutes. Remove from oven and scatter with chopped basil.",
	"categories": [
		"685277E3-E44D-4104-A070-7B26E28C85BB-47062-000226F94A04E0E9"
	],
	"photo_url": "http://web2.paprikaapp.com/uploads/users/142149/389D470F-E400-471E-8CB2-4B3C51FFDB93-7486-000003FF2696F47B.jpg",
	"cook_time": "20 mins",
	"name": "Chicken Crust Pizza #Nocarbpizza #Bariatricpizza",
	"created": "2016-04-02 11:26:43",
	"notes": "",
	"image_url": "http://www.bariatriceating.com/wp-content/uploads/2015/06/pepperoniChickenCrust1.jpg",
	"prep_time": "20 mins",
	"servings": "",
	"nutritional_info": ""
}
 */
export interface Recipe {
	rating: number;
	photo_hash: string;
	on_favorites: boolean;
	photo: string;
	uid: string;
	scale: number;
	ingredients: string;
	source: string;
	hash: string;
	source_url: string;
	difficulty: string;
	categories: string[];
	photo_url: string;
	cook_time: string;
	name: string;
	created: string;
	notes: string;
	image_url: string;
	prep_time: string;
	servings: string;
	nutritional_info: string;
}

/*
Example:
{
	"hash": "37a5325865218ef03d802e0f719a1033eca9a8ee90f3be11591644be1168f957",
	"uid": "C4F325DE-4861-407C-B466-634D8852CDA6-13924-0005FF9D64D4CC55"
}
 */
export interface RecipeItem {
	hash: string;
	uid: string;
}

/*
Example:
{
	"recipes": 401,
	"pantry": 0,
	"meals": 16,
	"menus": 0,
	"groceries": 321,
	"bookmarks": 75,
	"menuitems": 0,
	"categories": 17
}
 */
export interface Status {
	recipes: number;
	pantry: number;
	meals: number;
	menus: number;
	groceries: number;
	bookmarks: number;
	menuitems: number;
	categories: number;
}
