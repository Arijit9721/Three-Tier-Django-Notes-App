# ----------------------- 1st Stage Build ----------------------------------------
    FROM python:3.9 AS Builder

    WORKDIR /app
    
    # Install system dependencies
    RUN apt-get update && apt-get upgrade -y && \
        apt-get install -y gcc default-libmysqlclient-dev pkg-config && \
        rm -rf /var/lib/apt/lists/*
    
    # Copy requirements and install Python dependencies
    COPY requirements.txt .
    RUN pip install mysqlclient
    RUN pip install --no-cache-dir -r requirements.txt
    RUN pip install --no-cache-dir gunicorn
    
    # ------------------------- Final Build --------------------------------------------
    FROM python:3.9-slim
    
    WORKDIR /app
    
    # Install runtime dependencies
    RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    curl \  
    && rm -rf /var/lib/apt/lists/*
    
    # Copy installed packages from the Builder stage
    COPY --from=Builder /usr/local/lib/python3.9/site-packages/ /usr/local/lib/python3.9/site-packages/
    COPY --from=Builder /usr/local/bin/gunicorn /usr/local/bin/gunicorn
    
    # Copy application code
    COPY Backend/ /app/Backend/
    COPY APIs/ /app/APIs/
    COPY manage.py .
    
    # Expose the port the app runs on
    EXPOSE 8000
    
    