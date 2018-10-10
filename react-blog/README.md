"attributes": {
    "title": {
      "default": "",
      "type": "string"
    },
    "content": {
      "default": "",
      "type": "text"
    },
    "author": {
      "model": "user",
      "via": "articles",
      "plugin": "users-permissions"
    },
    "content_short": {
      "default": "",
      "type": "text"
    },
    "cover": {
      "model": "file",
      "via": "related",
      "plugin": "upload",
      "required": false
    },
    "tags": {
      "collection": "tag",
      "via": "articles"
    }
  }