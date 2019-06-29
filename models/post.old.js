commit 0160fc1a41fe9e1a02da9f2e218ab5ac6e69f2bd
Author: Prateek Chachra <prateekchachra@live.com>
Date:   Mon Jun 24 23:56:05 2019 +0530

    Changed models and added new functionalities to Speech

diff --git a/models/Post.js b/models/Post.js
index 5fa1c0b..4bad765 100644
--- a/models/Post.js
+++ b/models/Post.js
@@ -1,6 +1,6 @@
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
-
+const {CommentSchema} = require('./Comment');
 //Create schema
 
 const PostSchema = new Schema({
@@ -35,51 +35,8 @@ const PostSchema = new Schema({
         }
 
     ],
-    commendations: [
-        {
-            user: {
-                type: Schema.Types.ObjectId,
-                ref: 'users'
-            },
-            text: {
-                type: String,
-                required: true
-            },
-            name : {
-                type: String,
-            },
-            avatar: {
-                type: String
-            },
-            date: {
-                type: Date,
-                default: Date.now
-            }
-        }
-
-    ],     recommendations: [
-        {
-            user: {
-                type: Schema.Types.ObjectId,
-                ref: 'users'
-            },
-            text: {
-                type: String,
-                required: true
-            },
-            name : {
-                type: String,
-            },
-            avatar: {
-                type: String
-            },
-            date: {
-                type: Date,
-                default: Date.now
-            }
-        }
-
-    ]
+    commendations: [CommentSchema],    
+     recommendations: [CommentSchema]
     
 
 });
