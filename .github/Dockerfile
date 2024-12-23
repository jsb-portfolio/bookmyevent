# Use alpine Node image as base
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy files
COPY artifacts/next_build_output /app/

# Change ownership of Working Directory to UID 1000
RUN chown -R 1000:1000 /app
USER 1000

ENV NODE_ENV=production

CMD ["node", "src/server.js"]