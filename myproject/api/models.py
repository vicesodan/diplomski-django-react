from django.db import models


class HopsUser(models.Model):
    def __str__(self):
        return self.username, self.password
    
    username = models.CharField(max_length=256)
    password = models.CharField(max_length=256)
    email = models.EmailField()