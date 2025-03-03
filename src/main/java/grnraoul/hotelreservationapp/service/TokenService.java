package grnraoul.hotelreservationapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class TokenService {


    private JwtEncoder encoder;

    @Autowired
    private JwtDecoder jwtDecoder;


    public TokenService(JwtEncoder encoder) {
        this.encoder = encoder;
    }

    public String generateJwt(Authentication auth){

        Instant now = Instant.now();

        String scope = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(auth.getName())
                .claim("roles", scope)
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();



    }
}
