# README

This is a test repo to test how many concurrent SSE connection a node can handle.

On my MacBook Pro 2014 (i7, 16GB RAM), I've been able to top 2350 concurrent connections before chugging. After that I wasn't able to fork new processes.

## How to test

```bash
ruby ./test_10k.rb
```

I've deployed a mono-node server to https://20210510-test-10k-live-connections.osc-fr1.scalingo.io/ in order to test but the bottle neck has been my laptop so far.
