type Messages =
  | "CHANNEL_OPEN"
  | "CHANNEL_CLOSE"
  | "CHANNEL_FAIL"
  | "MESSAGE_CHANNEL_OPEN"
  | "MESSAGE_CHANNEL_CLOSE"
  | "MESSAGE_CHANNEL_FAIL";

type ChannelDefinition = {
  [key: string]: {
    open: Messages;
    close: Messages;
    fail: Messages;
  };
};

const impl = {
  test: {
    open: "CHANNEL_OPEN",
    close: "CHANNEL_CLOSE",
    fail: "CHANNEL_FAIL",
  },
  message: {
    open: "MESSAGE_CHANNEL_OPEN",
    close: "MESSAGE_CHANNEL_CLOSE",
    fail: "MESSAGE_CHANNEL_FAIL",
  },
} satisfies ChannelDefinition;

function openChannel<T extends ChannelDefinition>(def: T, channel: keyof T) {
  // to be implemented
  def[channel]
}

openChannel(impl, "message");
