from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


@api_view(["GET"])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getMyUserInfo(request):
    user = request.user
    serializer = UserSerializer(user, many=False, context={"request": request})

    return Response(serializer.data)
