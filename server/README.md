# menu-ab-api

## To test api calls

1. Create a Postman Account
2. Visit MenuLab's Integration Tests using the following link:
https://red-zodiac-874268.postman.co/workspace/New-Team-Workspace~4b467284-0573-4d7d-bdd0-b892bacd217b/collection/25780226-1536761b-6a82-49c3-bdaa-0079f4b34574?action=share&creator=25799855
3. Download and Select Postman Desktop Agent: 
![image](https://user-images.githubusercontent.com/40531928/236559484-f92898bb-35c8-426c-afa1-ec5481362bb2.png)
5. Run the MenuLab's client and server locally (see menu-ab-api and menu-ab-web's 'To run' README.md)
6. In the likelihood that the mock user's JWT token has expired (480 hrs), generate a new token by sending a request for the /auth/login API call:
![image](https://user-images.githubusercontent.com/40531928/236560675-469ce1b3-7dea-45ea-89d1-1516db05207d.png)
7. Copy and paste the newly-generated 'token' into the value parameter within the Header Tab to execute any of the API calls
![image](https://user-images.githubusercontent.com/40531928/236561032-13eac424-e2ba-4fe9-ac82-fee8edd83c13.png)

*Now you should be able to test all of the backend functionality of MenuLab!*

## Example Test (create a menu, add item to menu, delete menu):
1. Select POST /auth/login, and click Send (to create a new Token)
3. Copy the generated Token (Starting now, for all API Calls, paste the generated Token in the Header Tab)
4. Select POST /dashboard/menus 
5. Edit the 'name' value in the Body tab to any menu name, and click Send (to create a new Menu)
6. Follow step 4 for POST /dashboard/item (to create a new Item)
7. Select GET /dashboard/items, and click Send (to get Item ID of new Item)
8. Select GET /dashboard/menus, and click Send (Get Menu ID of new Menu)
9. Select POST /dashboard/menus/item/:item_id
10. Change the form so that it reads: http://localhost:5000/dashboard/menus/item/{your_item_id}
11. In the Body tab, change the value of "menu_id" to be your menu id, and click Send (to add Item to Menu)
12. Select DEL /dashboard/menus/:menu_id
13. In the Params tab, change the value of "menu_id" to be your menu id, and Click Send (to delete Menu)


*For further exposition on all API calls, see comments in [server/routes/dashboard.js](https://github.com/sfdevshop/menu-ab-api/blob/main/server/routes/dashboard.js)*

## Future Work
Unit Testing with Jest
