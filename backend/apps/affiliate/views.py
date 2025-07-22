from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AffiliateReferral
from .serializers import (
    AffiliateReferralSerializer,
    AffiliateSerializer,
    AffiliateSignupSerializer,
)


class AffiliateSignupView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if hasattr(request.user, "affiliate"):
            serializer = AffiliateSerializer(request.user.affiliate)
            return Response(serializer.data, status=status.HTTP_200_OK)

        serializer = AffiliateSignupSerializer(data={}, context={"user": request.user})
        serializer.is_valid(raise_exception=True)
        affiliate = serializer.save()
        return Response(
            AffiliateSerializer(affiliate).data, status=status.HTTP_201_CREATED
        )


class AffiliateReferralListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AffiliateReferralSerializer

    def get_queryset(self):
        if not hasattr(self.request.user, "affiliate"):
            return AffiliateReferral.objects.none()
        return AffiliateReferral.objects.filter(
            affiliate=self.request.user.affiliate
        ).select_related("referred_user")
