package com.elearning.e_hub.common.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {
    @Around("@annotation(com.elearning.e_hub.common.annotation.LogExecution)")
    public Object logExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;
            log.info("[LOG] Method: {} executed in {} ms", joinPoint.getSignature(), duration);
            return result;
        } catch (Exception ex) {
            log.error("[LOG] Exception in method: {} - {}", joinPoint.getSignature(), ex.getMessage());
            throw ex;
        }
    }
}

