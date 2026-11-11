package com.catolica.ia.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@RestController
@RequestMapping("/api/psicologa")
@CrossOrigin(origins = "*")
public class Psicologa {

    // Substitua pela sua chave de API ou configure como variável de ambiente
    private static final String API_KEY = "SUA_CHAVE_API_AQUI";
    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    @PostMapping("/conversar")
    public ResponseEntity> conversar(@RequestBody Map<String, String> request) {
        String mensagemUsuario = request.get("texto");

        // Define a personalidade e doutrina da IA Católica
        String systemPrompt = "Você é a Sophia, uma orientadora espiritual e acolhedora virtual católica. "
                + "Seu objetivo é ajudar as pessoas no discernimento vocacional, na descoberta de santos de devoção, "
                + "no combate à frieza/aridez espiritual e em dúvidas da vida de fé. "
                + "Responda a qualquer pergunta de forma empática, sábia, fundamentada na Tradição Católica e na Bíblia, "
                + "sempre adaptando sua resposta ao tom da pergunta do usuário.";

        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(API_KEY);

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-3.5-turbo");

            List> messages = new ArrayList<>();
            
            Map<String, String> systemMsg = new HashMap<>();
            systemMsg.put("role", "system");
            systemMsg.put("content", systemPrompt);
            messages.add(systemMsg);

            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", mensagemUsuario);
            messages.add(userMsg);

            body.put("messages", messages);

            HttpEntity> entity = new HttpEntity<>(body, headers);
            ResponseEntity response = restTemplate.postForEntity(API_URL, entity, Map.class);

            List choices = (List) response.getBody().get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");
            String respostaTexto = (String) message.get("content");

            Map<String, String> jsonResponse = new HashMap<>();
            jsonResponse.put("resposta", respostaTexto);
            return ResponseEntity.ok(jsonResponse);

        } catch (Exception e) {
            // Resposta de contingência caso a API não seja chamada
            Map<String, String> fallback = new HashMap<>();
            fallback.put("resposta", "Salve Maria! Tive um pequeno problema ao processar sua resposta no momento. Pode refazer sua pergunta?");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(fallback);
        }
    }
}