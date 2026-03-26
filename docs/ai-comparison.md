# Comparación entre asistentes

##  Primeros prompts y respuestas

### Prompt Chat-Gpt Go(GPT 5.3)

At the moment there are a few things i would like to know a little bit more about , it is mostly centered around concepts so not really antyhign code specific itself itself , concetps that i am currently struggling with would be things like: -The different design patterns when developing a Windows app(MVP,MVVM, etc) and where they are apprpriate to implement them. -How does deployment of an app difers from hosting the app in your local machie and running it . What "build" really means when running and debugging an app for the first time and how it is different from clicking on "run" outright. What does localstorage mean in regards to persistence and its play with using different browsers in different computers? Those above are the set of questions that i think it would be useful for me to have a btter understanding of.

### Respuesta Chat-Gpt Go(GPT 5.3)

**Patrones de Diseño**

All these patterns are about:
Separating responsibilities in your code

So your app doesn’t become:
UI + logic + data all mixed together

Model → data + business logic
View → UI (what user sees)
Controller / Presenter / ViewModel → glue between them

MVP (Model–View–Presenter)

Structure:
View → Presenter → Model
View = passive (just displays)
Presenter = contains logic
Model = data

When to use:
✔ Simple apps
✔ When you want clear separation
✔ Easy to test logic

MVVM (Model–View–ViewModel)

Structure:
View ↔ ViewModel ↔ Model

Key difference:
ViewModel automatically syncs with UI (data binding)
Example (React / modern frameworks)
View → JSX
ViewModel → state (useState)
Model → backend / data

When to use:
✔ Complex UI
✔ Real-time updates
✔ Frameworks like React, Angular

**Despliegue vs Ejecución en local**

Local execution
Runs ONLY on your computer

Example:
http://localhost:xxxx

Deployment
App is hosted on a server
Accessible via URL worldwide

Example:
https://xxxxxxxxxxx.app

Key differences
Aspect	Local	Deployed
Access	only you	everyone
Environment	your machine	server
Reliability	unstable	stable
Internet	not required	required


**Concepto de "build"**

Build = transformation step
Source code → optimized runnable version

In simple apps (your current one)
Build = basically nothing

Browser reads:
HTML + JS + CSS directly

In modern apps (Next.js, React)
Build does:
✔ bundle files
✔ optimize code
✔ remove unused parts
✔ prepare for server

Example
You write:
```JS
import something from "library";
```

Build turns it into:
Single optimized JS file

**Concepto de "LocalStorage" y de "Persistence"**

What is persistence?
Data remains after app closes
localStorage

Browser storage:
key → value (string-based)

Example:
```JS
localStorage.setItem("tasks", JSON.stringify(tasks));
```
VERY IMPORTANT
localStorage is NOT global

Example
You save tasks on:
Chrome (your laptop)

Then open:
Firefox or another computer

Result:
No tasks 

Why?
Because:
localStorage is tied to:
✔ browser
✔ device
✔ domain

Real backend instead
Database (server)

Then:
Same data across devices 

### Prompt Claude Sonnet (4.6 Extended: Free Tier)
At the moment there are a few things i would like to know a little bit more about , it is mostly centered around concepts so not really antyhign code specific itself itself , concetps that i am currently struggling with would be things like:
-The different design patterns when developing a Windows app(MVP,MVVM, etc) and where they are apprpriate to implement them.
-How does deployment of an app difers from hosting the app in your local machie and running it .
What "build" really means when running and debugging an app for the first time and how it is different from clicking on "run" outright.
What does localstorage mean in regards to persistence and its play with using different browers in different computers?

### Respuesta Claude Sonnet (4.6 Extended: Free Tier)

Great set of questions — and they're all very practically useful, not just academic. Let me walk through each one.

**Patrones de Diseño**
Design Patterns: MVP, MVVM, MVC etc.
These are all ways of separating concerns in your app — basically, keeping your UI code, your logic, and your data from getting tangled together into one messy blob.
MVC (Model-View-Controller) is the oldest and most foundational. The Model holds your data, the View displays it, and the Controller sits in between handling user input and updating both. It works well for web apps (ASP.NET MVC, for example) but in desktop/Windows apps the Controller can get awkward because the View and Controller end up very tightly coupled.
MVP (Model-View-Presenter) is MVC's evolution for desktop apps (think WinForms). The Presenter replaces the Controller, but crucially the View is now "dumb" — it does nothing except display what it's told and pass user events to the Presenter. All the logic lives in the Presenter. This makes it very testable. You'd use MVP when working with WinForms or older-style Windows apps where you don't have data binding.
MVVM (Model-View-ViewModel) is what modern Windows development uses, especially WPF and XAML-based apps. The ViewModel exposes data in a way that the View can bind to directly — meaning the UI updates automatically when the data changes, without you writing manual "update the label" code. This is the go-to for any WPF, UWP, or MAUI project. It's a bit harder to grasp at first but extremely powerful once it clicks.
The short rule of thumb: WinForms → MVP, WPF/MAUI/XAML → MVVM, Web (ASP.NET) → MVC.
**Despliegue vs Ejecución en local**
When you run an app on your local machine, everything it needs — the runtime, the files, the database — lives on your computer. Only you can access it, and if you close your laptop, it stops existing for everyone.
Deployment means packaging your app and putting it somewhere else — a server, a cloud platform (like Azure, AWS, or a web host) — so that other people can reach it over the internet, and it runs independently of your machine. You also have to think about things you never worried about locally: environment variables for secrets, a proper database that isn't just a local file, HTTPS certificates, scaling if lots of people use it at once, and keeping it running 24/7.
Think of it like cooking at home vs. opening a restaurant. At home you just cook. In a restaurant you need hygiene standards, stock management, staff, and the food has to be consistent every time for every customer.
**Concepto de "build"**
This one confuses a lot of people because IDEs like Visual Studio blur the steps together.
Building is the process of taking your human-readable source code and compiling it into something the computer can actually execute — in C# that's a .exe or .dll file made of bytecode. The build step also checks for errors, links all your references together, and produces the output files. If your code has a syntax error or a missing reference, the build fails and you never even get to run anything.
Running is simply executing that already-built output. When you hit the "Run" or "Start" button in Visual Studio, it actually does both steps in sequence — it builds first, then runs the result. The reason this matters is that if you make a code change and try to run, it rebuilds first. If you just want to check whether your code compiles without launching the whole app, you can hit Build (Ctrl+Shift+B) on its own, which is much faster for catching errors early.
Debugging (F5 in Visual Studio) does the same thing but also attaches the debugger so you can use breakpoints, inspect variables, and step through code line by line.
**Concepto de "LocalStorage" y de "Persistence"**
LocalStorage is a small storage area that lives inside your browser, tied to a specific website. When a website saves something to LocalStorage (like your preferences, a login token, or a dark mode setting), it's written into that browser's storage on that computer's hard drive.
This has a few important implications. First, it persists between sessions — if you close the tab and reopen it, the data is still there, unlike memory which disappears the moment you close the tab. Second, it is completely local — it has nothing to do with a server or a database. If you clear your browser data, it's gone. If you open the same website in Chrome, the LocalStorage is completely separate from what Firefox sees, even on the same machine. And if you log into a different computer entirely, LocalStorage on that machine starts empty — none of your data followed you.
This is why LocalStorage is fine for small, non-critical, device-specific things (like "this user prefers dark mode") but is completely the wrong tool if you need data to follow the user across devices or browsers — for that you need a proper backend database tied to a user account.

## Segundos prompts preguntando por feedback para mejorar los prompts y respuestas 

### Prompt Chat-Gpt Go(GPT 5.3)

I like the responses fair enough indeed and now i have got a little bit of a better grasp of these concepts. Now tho, i would like to know how do you think it would have better for me to rephrase my questions in order for you to better adjust your response, what phrasing(for the previous concepts I asked you about )would you use or how would you approach an AI such as yourself to get the clearest and most comprehensive response if you were a junior programmer/ student ?

### Respuesta Chat-Gpt Go(GPT 5.3)

**Como hacer un prompt**

Core principle of good technical prompting

A strong prompt usually includes:

1. Context (your level + scenario)
2. Scope (what exactly you want)
3. Depth (how detailed)
4. Constraints (examples, comparisons, use cases)

**Patrones de Diseño**

Improved version
Explain the MVP and MVVM design patterns in the context of application development. 
Compare their structure, responsibilities, and typical use cases, and explain when one would be preferred over the other in a real-world application (e.g., a task management app). 
Include a simple conceptual example for each.

Why this is better
✔ Forces comparison
✔ Forces practical context
✔ Forces structure explanation
✔ Avoids vague answers

**Despliegue vs Ejecución en local**

Improved version
Explain the difference between running an application locally and deploying it to a production environment. 
Include differences in infrastructure, accessibility, environment configuration, and reliability. 
Also explain what changes (if any) a developer needs to make when moving from local development to deployment.

Why this works better
✔ Forces multi-dimensional answer
✔ Avoids surface-level explanation
✔ Adds real-world engineering context

**Concepto de "build"**

Improved version
Explain what the “build” process means in software development, especially in modern JavaScript applications. 
Compare it with “running” and “debugging” an application, and describe what happens under the hood during each step. 
Include a practical example (e.g., a web app using a framework).

Improvement
✔ Forces internal mechanics explanation
✔ Adds practical framing
✔ Encourages deeper reasoning

**Concepto de "LocalStorage" y de "Persistence"**

Improved version
Explain how localStorage works in terms of data persistence in web applications. 
Clarify its limitations regarding scope (browser, device, domain), and compare it with using a backend database in terms of scalability and real-world usage. 
Include an example of how this affects a task management app.

Improvement
✔ Forces comparison (very important)
✔ Links to real app (your project)
✔ Adds constraints (scope, limitations)

GOLD STANDARD PROMPT (you can reuse this everywhere)
Explain concept in a way suitable for a junior developer. 
Include:
- a clear definition
- how it works internally (if relevant)
- a practical example
- common mistakes or misconceptions
- when it should and should not be used

Common mistakes when prompting AI

Avoid:
vague questions (“what is X?”)
too broad (“explain everything about…”)
no context (AI guesses your level)

Pro-level prompting (what gets top marks)

Add evaluation angle:
“Compare two approaches and evaluate which is better under specific conditions "

### Prompt Claude Sonnet (4.6 Extended: Free Tier)

I like the responses fair enough indeed  and now i have got a little bit of a better graspo of these concepts. Now tho, i would like to know how do you think it would have better for me to rephrase my questions in order for you to better adjust your  response, what phrasing(for the previous concepts I asked you about )would you use or how would  you approach an AI such as yourself to get the clearest and most comprehensive response if you were a junior programmer/ student ?

### Respuesta Claude Sonnet (4.6 Extended: Free Tier)

Great meta-question — and honestly, learning how to ask good questions is a skill that will serve you well beyond just AI tools, in Stack Overflow, in team environments, everywhere.
Let me go through each of your original questions and show you a sharper version, then explain the principles behind why it works better.

The General Principles First
A good question to an AI (or anyone, really) tends to include:

Your context — who you are and what you already know
The specific gap — what exactly you don't understand, not just the topic
The output you want — an explanation? A comparison? An example? A diagram?
Constraints — keep it simple, use analogies, avoid jargon, give code examples, etc.

**Patrones de Diseño**

Your Questions, Rephrased
Original: "The different design patterns when developing a Windows app (MVP, MVVM, etc) and where they are appropriate to implement them."
Sharper version:

"I'm an HND student learning Windows app development in C#. Can you explain the differences between MVC, MVP, and MVVM as if I already understand basic OOP but have never used any of them? For each one, tell me what problem it solves, when you'd pick it over the others, and give a real-world scenario where it fits best."

Why it's better: you told me your level, asked for the why not just the what, and asked for concrete scenarios rather than abstract definitions.

**Despliegue vs Ejecución en local**

Original: "How does deployment of an app differ from hosting the app in your local machine and running it."
Sharper version:

"I understand how to run a C# app locally in Visual Studio, but I have no experience with deployment. Can you walk me through what actually changes when you take that same app and deploy it to a real server or cloud platform? What new problems do you have to solve that don't exist locally, and what does the process roughly look like step by step?"

Why it's better: anchoring it to something you do know (running locally in VS) gives me a starting point to build from. Asking "what new problems appear" forces a practical, useful answer rather than a generic definition.

**Concepto de "build"**

Original: "What 'build' really means when running and debugging an app for the first time and how it is different from clicking on 'run' outright."
Sharper version:

"In Visual Studio, I keep seeing 'Build', 'Run', and 'Debug' as separate options but I'm not sure what's actually happening differently under the hood for each one. Can you explain what each step does technically, in what order they happen, and why it matters to understand the difference as a developer?"

Why it's better: naming the specific tool (Visual Studio) grounds the answer, and asking "what's happening under the hood" signals you want a deeper explanation, not just a surface-level "build compiles your code" answer.

**Concepto de "LocalStorage" y de "Persistence"**

Original: "What does localstorage mean in regards to persistence and its play with using different browsers in different computers."
Sharper version:

"I've heard LocalStorage is used for persistence in web apps but I don't fully understand what that means in practice. Can you explain what LocalStorage actually is, where the data physically lives, what 'persistence' means in this context, and what the limitations are — specifically what happens when I switch browsers or use a different computer? When should a developer use it and when is it the wrong tool?"

Why it's better: you broke the question into its actual sub-parts, which stops me from giving a vague overview and forces a structured, thorough answer. Ending with "when is it the wrong tool" is particularly powerful — it always reveals practical wisdom that a basic explanation misses.

The One-Line Formula to Remember

"I know X. I'm trying to understand Y. Explain it to me as a [your level], focusing on [specific angle], using [examples/analogies/comparisons]."

That structure alone will get you noticeably better answers from any AI, every single time.

## Terceros prompts y respuestas con ejemplos de codigo 

### Prompt Chat-Gpt Go(GPT 5.3)

If you could provide pretty easy to read examples using a code-angle point of view of the 4 concepts you just went through a few minutes ago, what would you come up with (albeit pretty simple)?

### Respuesta Chat-Gpt Go(GPT 5.3)

MVP (your current style)
Logic is separate, UI is passive

**Patrones de Diseño**

```JS
// MODEL
let tasks = [];

// PRESENTER (logic)
function addTask(title) {
  tasks.push({ title, completed: false });
  renderTasks();
}

// VIEW (UI)
function renderTasks() {
  const list = document.getElementById("tasks");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    list.appendChild(li);
  });
}
```
Key idea
Presenter controls everything
View just displays

MVVM (React-style thinking)
UI reacts automatically to state
Example (conceptual):
```JS
// ViewModel (state)
let tasks = [];

// Update state
function addTask(title) {
  tasks = [...tasks, { title, completed: false }];
  updateUI();
}

// View reacts to state
function updateUI() {
  console.log("UI updated automatically with:", tasks);
}
```
Key difference
MVP → you call render manually
MVVM → UI reacts to state change

**Despliegue vs Ejecución en local**
Local (your machine)
```JS
fetch("http://localhost:xxxx/api/tasks")
  .then(res => res.json())
  .then(data => console.log(data));
```
Only works on your computer

Deployed(Vercel)
```JS
fetch("https://xxxxxxx.app/api/tasks")
  .then(res => res.json())
  .then(data => console.log(data));
```
Works for everyone

Key difference
Same code
Different environment

**Concepto de "build"**
Run(Execute code)
```JS
console.log("App is running");
```
Browser executes directly

Debug(find problems)
```JS
function add(a, b) {
  debugger; // pauses execution
  return a + b;
}
```
You inspect values step by step

Build (modern apps)
Before build:
```JS
import { sum } from "./math.js";

console.log(sum(2, 3));
```
After build (simplified):
```JS
// everything bundled together
console.log(2 + 3);
```
Key idea
Build = prepare code
Run = execute code
Debug = inspect code

**Concepto de "LocalStorage" y de "Persistence"**

Save data
```JS
const tasks = [{ title: "Comer" }];

localStorage.setItem("tasks", JSON.stringify(tasks));
```
Load data
```JS
const stored = localStorage.getItem("tasks");

if (stored) {
  const tasks = JSON.parse(stored);
  console.log(tasks);
}
```
Important limitation
Open another browser:
```JS
localStorage.getItem("tasks");
```
Result:
null 

Why?
Data is stored per browser + per device

Backend alternative (concept)
```JS
fetch("/api/tasks")
  .then(res => res.json())
  .then(tasks => console.log(tasks));
```
Same data everywhere ✔

Final mental link (code perspective)
MVP → manual rendering
MVVM → state-driven UI

Local vs Deploy → same code, different location

Build → transforms code
Run → executes code
Debug → inspects execution

localStorage → browser-only persistence
Backend → global persistence

### Prompt Claude Sonnet (4.6 Extended: Free Tier)

Can you come up with  pretty easy to read examples to help me contextualize a little bit the general concept of what you explained to me about those fours concepts before? A code-specific angle(albeit pretty simple) would be useful.

### Respuesta Claude Sonnet (4.6 Extended: Free Tier)

Sure! I'll keep each example short, heavily commented, and focused on illustrating the concept rather than being production-ready code.

**Patrones de Diseño**
MVP vs MVVM in C#

MVP (think WinForms style)
The key idea is that the View is dumb — it just calls the Presenter and displays what it's told.
```CS
// THE MODEL - just holds data, no logic
public class UserModel
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// THE VIEW INTERFACE - the Presenter only knows this contract, not the actual form
public interface IUserView
{
    string EnteredName { get; }      // Presenter reads input from here
    void DisplayMessage(string msg); // Presenter pushes output through here
}

// THE PRESENTER - all the logic lives here
public class UserPresenter
{
    private IUserView _view;
    private UserModel _model;

    public UserPresenter(IUserView view)
    {
        _view = view;
        _model = new UserModel();
    }

    public void OnSaveButtonClicked()
    {
        // Logic here, not in the form
        if (string.IsNullOrEmpty(_view.EnteredName))
        {
            _view.DisplayMessage("Name cannot be empty!");
            return;
        }

        _model.Name = _view.EnteredName;
        _view.DisplayMessage($"Saved: {_model.Name}");
    }
}

// THE VIEW (the actual WinForms form) - notice it has almost no logic
public class UserForm : Form, IUserView
{
    private UserPresenter _presenter;
    private TextBox nameTextBox = new TextBox();
    private Button saveButton = new Button();

    public string EnteredName => nameTextBox.Text; // Just exposes the value

    public void DisplayMessage(string msg)
    {
        MessageBox.Show(msg); // Just displays what it's told
    }

    public UserForm()
    {
        _presenter = new UserPresenter(this); // View knows about Presenter
        saveButton.Click += (s, e) => _presenter.OnSaveButtonClicked(); // Delegates to Presenter
    }
}
```
Notice the Form itself has no if statements, no validation — it just passes things along. All decisions are in the Presenter.

MVVM (think WPF style) — the ViewModel notifies the View automatically

```CS
// THE MODEL - same as before, just data
public class UserModel
{
    public string Name { get; set; }
}

// THE VIEWMODEL - implements INotifyPropertyChanged so the UI updates automatically
public class UserViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    private string _name;
    public string Name
    {
        get => _name;
        set
        {
            _name = value;
            // This line is the magic — it tells the UI "hey, this value changed, update yourself"
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name)));
        }
    }

    private string _message;
    public string Message
    {
        get => _message;
        set
        {
            _message = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Message)));
        }
    }

    public void Save()
    {
        if (string.IsNullOrEmpty(Name))
            Message = "Name cannot be empty!";
        else
            Message = $"Saved: {Name}";
    }
}
```
```XML
<!-- THE VIEW in XAML - notice there is zero C# logic here, just bindings -->
<StackPanel>
    <!-- This TextBox is BOUND to the ViewModel's Name property -->
    <!-- When the user types, Name updates. When Name changes in code, the box updates. -->
    <TextBox Text="{Binding Name, UpdateSourceTrigger=PropertyChanged}" />

    <!-- Clicking this calls Save() on the ViewModel via a Command -->
    <Button Content="Save" Command="{Binding SaveCommand}" />

    <!-- This Label automatically shows whatever Message is -->
    <Label Content="{Binding Message}" />
</StackPanel>
```
The big difference from MVP: you never write "update this label with this value" — the binding does it for you automatically.

**Despliegue vs Ejecución en local**

This is less about logic and more about how your app connects to things differently in each environment.

```CS
// When running LOCALLY your connection string points to your own machine
// This only works on YOUR computer
string localConnection = "Server=localhost;Database=MyAppDB;Trusted_Connection=True;";

// When DEPLOYED your app needs to point to a real server
// This works for everyone on the internet
string deployedConnection = "Server=myapp-server.database.windows.net;Database=MyAppDB;User=admin;Password=secret;";

// ---------------------------------------------------------------
// THE CORRECT WAY: don't hardcode either — read from environment config
// Locally this reads from your appsettings.json file
// When deployed this reads from the server's environment variables
// Your code stays the same, only the config changes between environments
// ---------------------------------------------------------------
string connectionString = Configuration.GetConnectionString("DefaultConnection");
```
```JSON
// appsettings.json on your LOCAL machine
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyAppDB;Trusted_Connection=True;"
  }
}

// appsettings.json on the DEPLOYED server
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=myapp-server.database.windows.net;Database=MyAppDB;..."
  }
}
```
The app code is identical — only the config file changes. This is the core idea behind environment-based configuration.

**Concepto de "build"**
What the compiler actually produces
```CS
// This is YOUR source code - human readable, the compiler's input
public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}
```

When you **Build**, Visual Studio runs the C# compiler (csc.exe) on this and produces a `.exe` or `.dll` file. You can actually see these in your project folder under `bin/Debug/`. That file is what the computer actually runs — not your `.cs` file.
```CS
// What happens at each button press in Visual Studio:

Ctrl+Shift+B  (Build only)
  → Compiles your .cs files into a .exe / .dll
  → Reports any errors immediately
  → Does NOT run anything
  → Fast — good for checking your code compiles before doing anything else
```
F5  (Debug / Run with debugger)
  → Step 1: Builds first (same as above)
  → Step 2: Launches the .exe
  → Step 3: Attaches the debugger so breakpoints work
  → Slower — but you get full debugging power

Ctrl+F5  (Run without debugger)
  → Step 1: Builds first
  → Step 2: Launches the .exe
  → No debugger attached — runs faster, closer to how a real user experiences it
```CS
// A breakpoint in debug mode lets you pause HERE and inspect values
public int Add(int a, int b)
{
    int result = a + b; // <-- put a breakpoint on this line
    // When you hit F5 and reach this line, execution PAUSES
    // You can hover over 'result', 'a', 'b' and see their actual values
    // This is only possible because the debugger is attached (F5, not Ctrl+F5)
    return result;
}
```
**Concepto de "LocalStorage" y de "Persistence"**
JavaScript in the browser
```JS
// ---- SAVING to LocalStorage ----
// This writes a key-value pair into the browser's storage for this website
localStorage.setItem("theme", "dark");
localStorage.setItem("username", "carlos");

// ---- READING from LocalStorage ----
// Next time the user visits (even days later), this still works
let theme = localStorage.getItem("theme");
console.log(theme); // "dark"

// ---- REMOVING one item ----
localStorage.removeItem("username");

// ---- CLEARING everything ----
localStorage.clear();

// ---------------------------------------------------------------
// PRACTICAL EXAMPLE: remembering dark mode preference
// ---------------------------------------------------------------

// When the user toggles dark mode, save their preference
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    // Check whether dark mode is now ON or OFF
    let isDark = document.body.classList.contains("dark");

    // Save that preference locally in this browser
    localStorage.setItem("darkMode", isDark ? "true" : "false");
}

// When the page loads, check if we saved a preference before
window.onload = function() {
    let savedPreference = localStorage.getItem("darkMode");

    // If they previously turned dark mode on, apply it automatically
    if (savedPreference === "true") {
        document.body.classList.add("dark");
    }
    // If they've never visited before, savedPreference is null — we just do nothing
};
```
```JS
// ---- WHY IT FAILS ACROSS BROWSERS / COMPUTERS ----

// On Chrome on your laptop:
localStorage.setItem("darkMode", "true"); // saved in Chrome's storage

// On Firefox on your laptop:
localStorage.getItem("darkMode"); // returns NULL - Firefox has no idea about Chrome's data

// On Chrome on a different computer:
localStorage.getItem("darkMode"); // also returns NULL - different machine, different storage

// ---------------------------------------------------------------
// THE RIGHT APPROACH for data that needs to follow the user:
// Save it to your SERVER with their user account instead
// ---------------------------------------------------------------

// Instead of localStorage, you'd do something like:
fetch("/api/user/preferences", {
    method: "POST",
    body: JSON.stringify({ darkMode: true }),
    headers: { "Content-Type": "application/json" }
});
// Now the preference is stored in a database tied to their account
// and works on any browser, any computer, anywhere in the world
```
The pattern you'll notice across all four is that the concept and the code are really just the same idea expressed in two different languages — once the analogy clicked, the code is just spelling it out formally. Let me know if any of these you'd like to push further!
