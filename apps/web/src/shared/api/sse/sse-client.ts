export class SseClient {
  private sse: EventSource | null = null;

  public connect(url: string) {
    if (this.sse) {
      this.sse.close();
    }

    this.sse = new EventSource(url);

    this.sse.onmessage = (event) => {
      console.info(event.data);
    };

    return this;
  }

  public on(event: string, handler: (e: MessageEvent) => void) {
    this.sse?.addEventListener(event, handler);

    return this;
  }

  public off(event: string, handler: (e: MessageEvent) => void) {
    this.sse?.removeEventListener(event, handler);

    return this;
  }

  public disconnect() {
    this.sse?.close();
    this.sse = null;
  }

  public getSse() {
    return this.sse;
  }
}
