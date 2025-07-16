### 0.4: New note diagram

```mermaid
sequenceDiagram
    participant b as browser
    participant s as server

    Note right of b: Click Save Button

    b->>+s: POST https://studies.cs.helsinki.fi/exampleapp/new_note<br/>Form Data: note=YOUR INPUT
    Note left of s: Create new note object with timestamp<br/>Add it to array notes(data.json)
    s-->>-b: URL Redirect<br/>Location: https://studies.cs.helsinki.fi/exampleapp/notes
    Note over b, s: HTTP status code 302

    %%below is same as Loading a page containing JavaScript
    b->>+s: GET https://studies.cs.helsinki.fi/exampleapp/notes
    s-->>-b: HTML document

    b->>+s: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    s-->>-b: the css file

    b->>+s: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    s-->>-b: the JavaScript file

    Note right of b: The browser starts executing the JavaScript code that fetches the JSON from the server

    b->>+s: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    s-->>-b: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

    Note right of b: The browser executes the callback function that renders the notes
```

### 0.5: Single page app diagram

```mermaid
sequenceDiagram
    participant b as browser
    participant s as server

    b->>+s: GET https://studies.cs.helsinki.fi/exampleapp/spa
    s-->>+b: HTML document

    b->>+s: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    s-->>-b: the css file

    b->>+s: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    s-->>-b: the JavaScript file

    Note right of b: The browser starts executing the JavaScript code that fetches the JSON from the server

    b->>+s: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    s-->>-b: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

    Note right of b: The browser executes the callback function that renders the notes
```

### 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant b as browser
    participant s as server

    Note right of b: Click Save Button<br/>Create new note object with timestamp to JSON<br/>Add it to local array notes<br/>Rerender notes on page<br/>Set RequestHeader 'Content-type'='application/json'

    b->>+s: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa<br/>Request Payload: {"content":"YOUR INPUT","date":"2025-07-14"}
    Note left of s: Add it to array notes(data.json)
    s-->>-b: {"message":"note created"}
    Note over b, s: HTTP status code 201
```
