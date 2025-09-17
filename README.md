# Task

Create a small web React application with the following functionality:
1. There's a counter set by default to 0.
2. There're 3 buttons with the following increasing value: 1, 2 and 3
 - If user has clicked on a button -> the counter increases by the increasing value of the button.
 - Upon clicking on a button, it's disabled for 0.5 * <increasing value> seconds. For example, the button with increasing value = 1 will be disabled for 0.5s upon clicking. In other words, it could be clicked once in 0.5s. Likewise, the button with 3 is available to be clicked once in 1.5s.
3. If the counter is not increased for 10s (i.e. no button is clicked), it starts decreasing with a rate of 1 per 1s. So, the counter with the value = 15 will be decreasing for 15s 'til it reaches 0.
 - If the counter had reached 0, it stops decreasing.
 - If the button is clicked, then the decreasing process is stopped and the counter increased by the increasing value of the button clicked. If now no button is clicked for 10s again, then the counter will start decreasing again.

Please create a separate GitHub repo for the solution.
Use React best practices in your codebase. Assume that the number of buttons can be changed, as well as their increasing values and timers' parameters. Make sure you don't need to re-write a lot of code if you get such requirement changes.
Put some minimal arbitrary styles so that the application doesn't look super ugly.
The application should be runnable by a single npm/yarn/etc command.