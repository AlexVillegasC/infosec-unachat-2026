## Purpose

Defines how the chat page presents the room, the live transcript, and the composer so a visitor can read and send messages without losing the current message behavior.

## Requirements

### Requirement: Room header
The page MUST show a header that names the chat room and states that messages are shared with everyone currently connected.

#### Scenario: Visitor opens the chat
- **WHEN** a visitor loads the chat page
- **THEN** the document title remains "Chat Socket.IO UNA"
- **THEN** a header is visible with the room name and a short live-sharing note

### Requirement: Empty transcript
The page MUST show an empty state while no messages have arrived, and MUST hide that empty state after the first message is shown.

#### Scenario: No messages yet
- **WHEN** a visitor opens the chat and no message has been received
- **THEN** the transcript area explains that the room is empty

#### Scenario: First message arrives
- **WHEN** the first message is shown in the transcript
- **THEN** the empty state is no longer visible
- **THEN** the message text is visible in the transcript

### Requirement: Composer
The page MUST keep a composer with a username field, a message field, and a control named Send. Those fields MUST keep the ids `nombre` and `m`. The message field MUST be cleared after a successful send. Focused controls MUST have a visible focus indicator.

#### Scenario: Visitor is ready to type
- **WHEN** a visitor views the composer
- **THEN** the username field, the message field, and the Send control are visible
- **THEN** the username field has id `nombre` and the message field has id `m`

#### Scenario: Visitor sends a message
- **WHEN** a visitor enters a username and a message and activates Send
- **THEN** the message field is empty

### Requirement: Readable transcript
The transcript MUST scroll independently of the composer so the latest message is not hidden behind the composer. Each shown message MUST include the sender name and the message content.

#### Scenario: Another visitor receives a message
- **WHEN** one visitor sends a plain message
- **THEN** another visitor sees that sender name and message text in the transcript

### Requirement: Rich messages stay contained
An accepted image URL MUST render as an image whose source is that URL, inside the transcript, with a bounded size. An accepted YouTube URL MUST render as an embedded player for that video, inside the transcript.

#### Scenario: Image message
- **WHEN** a visitor sends `http://image.com/image.jpg`
- **THEN** the transcript contains an image with that source

#### Scenario: YouTube message
- **WHEN** a visitor sends `https://www.youtube.com/watch?v=qYwlqx-JLok`
- **THEN** the transcript contains an embedded player for that video

### Requirement: Script text is not executed
A message or username that contains a script tag MUST be shown as text. The page MUST NOT run that script.

#### Scenario: Script payload in the composer
- **WHEN** a visitor sends `<script>alert(1)</script>` as both the username and the message
- **THEN** the transcript shows that text
- **THEN** no script element is inserted for that message
- **THEN** no dialog is opened
