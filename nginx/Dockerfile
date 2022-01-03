# ---- Nginx ---- #
FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.dev.conf /etc/nginx/conf.d

EXPOSE 80 443

# CMD ["nginx", "-g", "daemon off;"]
