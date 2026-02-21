const logError = (context, error) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] [${context}]`, error.message);
  if (process.env.NODE_ENV === 'development') {
    console.error(error.stack);
  }
};

module.exports = { logError };
