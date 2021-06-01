export class MockResponseHandler {
  status: () => this;

  json: (response: any) => any;

  constructor() {
    this.status = () => this;
    this.json = (response: any) => response;
  }
}
