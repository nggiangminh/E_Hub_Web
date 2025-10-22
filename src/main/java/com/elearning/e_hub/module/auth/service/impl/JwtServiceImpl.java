package com.elearning.e_hub.module.auth.service.impl;

import com.elearning.e_hub.module.auth.service.JwtService;
import com.elearning.e_hub.module.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token-ttl}")
    private long accessTokenTTL;

    @Value("${jwt.refresh-token-ttl}")
    private long refreshTokenTTL;

    private static final String SESSION_ID_CLAIM = "sessionId";

    // Lấy key từ secret
    private Key getSignKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // 1. Trích xuất username từ JWT
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 2. Kiểm tra token hợp lệ
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // 3. Tạo AuthenticationToken từ JWT
    public Authentication getAuthenticationToken(String token, UserDetails userDetails, HttpServletRequest request) {
        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
    }

    // 4. Tạo token mới cho người dùng
    @Override
    public String generateToken(User user, Long sessionId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(SESSION_ID_CLAIM, sessionId.toString());
        return createToken(claims, user.getEmail(), accessTokenTTL);
    }

    // 5. Tạo refresh token cho người dùng
    @Override
    public String generateRefreshToken(User user, Long sessionId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(SESSION_ID_CLAIM, sessionId.toString());
        return createToken(claims, user.getEmail(), refreshTokenTTL);
    }

    // 6. Xác thực refresh token
    @Override
    public String validateRefreshToken(String refreshToken) {
        try {
            Claims claims = extractAllClaims(refreshToken);
            if (!isTokenExpired(refreshToken)) {
                return claims.get(SESSION_ID_CLAIM, String.class);
            }
        } catch (Exception e) {
            // Token không hợp lệ hoặc hết hạn
        }
        return null;
    }

    // 7. Trích xuất sessionId từ token
    @Override
    public String extractSessionId(String token) {
        try {
            return extractClaim(token, claims -> claims.get(SESSION_ID_CLAIM, String.class));
        } catch (Exception e) {
            return null;
        }
    }

    // 8. Lấy thời gian sống của access token
    @Override
    public long getAccessTokenTTL() {
        return accessTokenTTL;
    }

    // --- Helper methods ---
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private String createToken(Map<String, Object> claims, String subject, long expiration) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignKey())
                .compact();
    }
}
