# Condoworks-Take-Home-Project
Developed by Bill Li (billli@gmail.com) using Node.js and Puppeteer for the Condoworks Co-op Test.
### Parser Problem
- Given a plain text file representing a utility bill of some sort, the program verifies that the file path is valid and then parses through the file using regular expressions, searching for specific data: customer and account number, bill period, bill number, bill date and total new charges.
- The file path is given as an argument to the function `parseFile(filePath)`, and the specified data is outputted through the console.
- First time learning and working with regex, was lots of fun
- Tools used: Vim, Linux, VS Code, Node.js, Git
### Scraper Problem
- The program uses Node.js and Puppeteer to navigate to a webpage, login using given credentials, navigate to a specific page, and downloads a specific pdf, while printing the location that the file is downloaded into.
- Uses async/await in Node.js, making the code much cleaner and more concice.
- Future improvement could be to relocate the destination folder for the download files to outside the src folder (caused error when I tried for some reason)
- First hands on experience with Puppeteer. Extremely fun tool, will continue to mess around with it in the future.
- Tools used: Vim, Linux, VS Code, Node.js, Puppeteer, Git
