package grnraoul.hotelreservationapp.model;

public class LoginResponseDTO {

    private HotelUser user;
    private String jwt;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(HotelUser user, String jwt) {
        this.user = user;
        this.jwt = jwt;
    }

    public HotelUser getUser() {
        return user;
    }

    public void setUser(HotelUser user) {
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    @Override
    public String toString() {
        return "LoginResponseDTO{" +
                "user=" + user +
                ", jwt='" + jwt + '\'' +
                '}';
    }
}
