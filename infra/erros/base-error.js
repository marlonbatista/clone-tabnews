export class BaseError extends Error {
  constructor(props) {
    super(props.message, { cause: props.cause });
    this.name = props.name;
    this.action = props.action;
    this.status_code = props.status_code;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
    };
  }
}
