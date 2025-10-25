events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Upstream for API load balancing (round-robin by default)
    upstream api_backend {
%{ for i in range(api_replicas) ~}
        server 172.25.0.${20 + i}:80 max_fails=2 fail_timeout=10s;
%{ endfor ~}
    }

    # Upstream for Web load balancing
    upstream web_backend {
%{ for i in range(web_replicas) ~}
        server 172.25.0.${30 + i}:80 max_fails=2 fail_timeout=10s;
%{ endfor ~}
    }

    server {
        listen 80;
        server_name localhost;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Proxy API calls to API backend (preserve /api path)
        location /api/ {
            proxy_pass http://api_backend/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Add header to identify which backend handled the request
            add_header X-Upstream-Server $upstream_addr always;
            
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Proxy all other requests to web backend
        location / {
            proxy_pass http://web_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
