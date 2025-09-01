# Assignment-5

# JavaScript DOM & Event Handling Concepts

## 1. Difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`

- `getElementById("id")` → returns **one element** with the given ID.  
- `getElementsByClassName("class")` → returns a **live HTMLCollection** of elements with that class.  
- `querySelector("selector")` → returns the **first element** matching the CSS selector.  
- `querySelectorAll("selector")` → returns a **static NodeList** of all matching elements.  

---

## 2. How to create and insert a new element into the DOM

```js
let div = document.createElement("div");  
div.textContent = "Programming Hero";  
document.body.appendChild(div);  
````

---

## 3. Event Bubbling

An event that occurs on a child element **spreads to its parent elements** and eventually reaches the **root (document)**.

---

## 4. Event Delegation in JavaScript

Attach an event listener to a **parent element** rather than each child element, and use `event.target` to handle events.

✅ **Why useful?**

* Improves **performance**
* Handles **dynamically added elements** efficiently

---

## 5. Difference between `preventDefault()` and `stopPropagation()`

* `preventDefault()` → prevents the **default browser actions** (e.g., stop form submit, stop link redirect).
* `stopPropagation()` → stops the event from **bubbling up** to parent elements.


