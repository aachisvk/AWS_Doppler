FROM public.ecr.aws/lambda/nodejs:14

COPY app.js package*.json  /var/task/

RUN yum upgrade glib2 -y

RUN yum --version

RUN npm ci --production

CMD [ "app.handler" ]
