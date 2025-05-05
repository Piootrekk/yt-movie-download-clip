const streamContentSchema = {
  content: {
    'application/octet-stream': {
      schema: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export { streamContentSchema };
