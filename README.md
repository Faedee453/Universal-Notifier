# Universal-Notifier

A lightweight, "drop-in" JavaScript notification system designed for universal use across any web project. No external CSS files, no external dependencies, just one script and one function call.

------------------------------------------------------------------------------------------------------
🛠 Usage:

To trigger a notification from anywhere in your interaction events (buttons, form submits, socket events), use the global sendMessage API:

- sendMessage("Message Title", "This is the content of the notification.");

expected result:
```html
Message Title
This is the content of the notification.
```
------------------------------------------------------------------------------------------------------

🛠 Example Use Case:

```html
<button onclick="sendMessage('System Alert', 'Database sync complete!')">
  Test Me
</button>
```

expected result:
```html
System Alert
Database sync complete!
```
------------------------------------------------------------------------------------------------------

🛠 Further Features:

+ Smooth animations per notification.
+ F.I.L.O (First In Last Out) system message meaning error overlap wont break message stream.
+ Simple drop in no external dependancies.

------------------------------------------------------------------------------------------------------

If you have any complaints please notify the super group.

Developed by:
```html
Fady
Mayuresh
```
