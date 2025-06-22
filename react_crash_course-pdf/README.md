## Tutorial

## Notes

kebab-case, snake case, PascalCase
anything inside {} is javascript, else html
Using class instead of className
must name function with capital letters

React hooks like useState must be called inside a functional component, not at the top level of your file.


Pro Tips
Component Design Principles
1. Single Responsibility: Each component should do one thing well
2. Reusability: Design components to be used in multiple places
3. Composition over Inheritance: Build complex UIs by combining simple
components
4. Props Interface: Always define TypeScript interfaces for props
File Naming Conventions
• PascalCase for component files: UserProfile.tsx
• Match the component name: UserProfile component in UserProfile.tsx
• Use descriptive names: SubmitButton.tsx instead of Button.tsx  

Props Best Practices
1. Always define TypeScript interfaces
2. Use destructuring for cleaner code
3. Provide default values

State vs Props
Props:
- Data passed from parent to child
- Read-only (cannot be modified by child)
- Like function parameters
State:
- Data managed within a component
- Can be modified using setter functions
- Triggers re-render when changed

Different Types of State
1. Simple Values
2. Objects
interface User {
name: string
email: string
age: number
}
const [user, setUser] = useState<User>({
name: '',
email: '',
age: 0

3. Arrays

State Updates are Async
setCount(count + 1);
console.log(count); // ❗ Still logs the old value

Use the functional update form if you depend on the previous state:
setCount(prevCount => prevCount + 1);


6. Event Handling

avoid Creating functions in render
Avoid Calling function immediately instead of passing reference.
Naming Convention: Prefix event handler functions with "handle" followed by the event type: handleClick, handleSubmit, handleInputChange.

7. Conditional Rendering
Forgetting falsy values can break rendering:

Readability Tip: For complex conditions, extract them into well-named
variables:
const isUserAdmin = user.role === 'admin'
const hasPermissions = user.permissions.length > 0
const canAccessPanel = isUserAdmin && hasPermissions

Chapter 8: Lists and Keys
Pro Tips
1. Always use keys: Even if your list doesn't change, keys help React optimize
rendering
2. Keep transformations simple: Don't perform heavy calculations in render - use
useMemo for expensive operations
3. Handle empty states: Always consider what to show when your list is empty
4. Always consider what to show while data is loading



Chapter 9: Hooks and Lifecycle with useEffect
stop memory leaks

1. Separate concerns: Use multiple useEffect hooks for different concerns
2. Always clean up: Remove event listeners, cancel API calls, clear timers
3. Be specific with dependencies: Include all values from component scope that are
used inside the effect


Chapter 10: Fetching Data

1. Always handle loading and error states: Users need feedback during async
operations
2. Use AbortController: Cancel requests when components unmount to prevent
memory leaks
3. Implement retry logic: Network requests can fail temporarily
4. Consider caching: Avoid unnecessary API calls for the same data


Chapter 11: Handling Form Inputs and Two-Way Binding

In React, there are two ways to handle form inputs:
1. Controlled Components: React controls the input value through state

2. Uncontrolled Components: The DOM manages the input value

computed property names


Chapter 12: Forms with React Hook Form

Type-Safe Validation with Zod
For even better validation, you can use Zod with React Hook Form:
npm install @hookform/resolvers zod

1. Use mode: 'onChange': For better user experience with real-time validation


Chapter 13. Routing with React Router v6+

1. Always wrap your app in BrowserRouter - This should be at the root level
2. Use Link instead of <a> tags - Links prevent page reloads
3. Type your route parameters - Use generics with useParams<{ paramName:
string }>()
4. Plan your route structure - Think about your app's navigation flow before coding

Chapter 14: Mini Project - Task

-----------------------
To do:
***** Advanced Pattern: Data Fetching with Caching
Exercise: Job Application Form