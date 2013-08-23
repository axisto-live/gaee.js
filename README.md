### Google Analytics Engagement Events

Track engagement for live and on-demand broadcast

### Errors

#### Buffering

Since the `onBuffer` event is fired as the media starts up we don't want to report it. Reporting the initial buffering phase would give the false impression that everyone experiences buffering issues.

Instead jwplayer's metadata.code value is monitored for the value 'NetStream.Buffer.Empty'.

##### Format

    {
      category: 'gaee.jwplayer',
      action: 'buffer',
      label: stream_url
    }

### Roadmap

- Grunt.js and Bower support
- Tests to define features
- Track state view events (pre-live -> live -> post-live -> on-demand)
- Track media events (play, pause etc)
- Track media playback segments (UTC time and On-demand percentage/time)
- Track playback errors (failed to start, playback buffered, playback stopped etc)

