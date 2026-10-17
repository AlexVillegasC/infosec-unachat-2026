## Why

The chat page is a bare list and a fixed black bar. Messages, images, and videos are hard to scan, the composer covers the latest line, and there is no empty state or visible focus treatment. The page should be readable in a browser session without changing how messages are validated or broadcast.

## What Changes

- Add a page header that names the room and explains that messages are shared live.
- Restyle the transcript as a scrollable column of message rows, with the sender name kept visible and the composer pinned below the transcript.
- Show an empty state until the first message arrives, then hide it.
- Give the username and message fields visible labels, a clearer Send control, and a visible keyboard focus state.
- Keep image and video embeds inside the message row with a bounded size.
- Preserve the existing element ids, the Send button name, the page title, and the server-side escaping of script content.

## Capabilities

### New Capabilities

- `chat-interface`: How the chat page presents the room, the transcript, the empty state, and the composer.

### Modified Capabilities

## Impact

- `index.html` layout and styles. Socket event names, message JSON, and `libs/unalib.js` validation stay as they are.
- Existing Mocha, Jest, and Playwright checks must keep passing, including the script, image, and YouTube cases.
- No new runtime dependencies.
