package com.example.demo.service;

import com.example.demo.dto.CardDTO;
import com.example.demo.dto.ChecklistDTO;
import com.example.demo.dto.RequestDTO.RequestChangeCardOrderDTO;
import com.example.demo.entity.CardEntity;
import com.example.demo.entity.ChecklistEntity;
import com.example.demo.entity.PlannerEntity;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.ChecklistRepository;
import com.example.demo.repository.PlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private PlannerRepository plannerRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private ChecklistRepository checklistRepository;


    public void postCard(CardDTO cardDTO) {
        System.out.println("cardDTO checklists = " + cardDTO.getChecklists());
        Optional<PlannerEntity> optionalPlanner = plannerRepository.findById(cardDTO.getPlannerId());
        System.out.println("cardDTO = " + cardDTO.getPlannerId());
        if(optionalPlanner.isPresent()) {
            PlannerEntity planner = optionalPlanner.get();
            CardEntity cardEntity = CardEntity.builder()
                    .title(cardDTO.getTitle())
                    .coverColor(cardDTO.getCoverColor())
                    .post(cardDTO.getPost())
                    .intOrder(cardDTO.getIntOrder())
                    .startDate(cardDTO.getStartDate())
                    .endDate(cardDTO.getEndDate())
                    .cardStatus(cardDTO.getCardStatus())
                    .plannerEntity(planner)
                    .build();

            cardRepository.save(cardEntity);

            List<ChecklistDTO> checklistDTOS = cardDTO.getChecklists();
            for(ChecklistDTO checklistDTO : checklistDTOS) {
                ChecklistEntity newChecklistEntity = ChecklistEntity.builder()
                        .checked(checklistDTO.getChecked())
                        .title(checklistDTO.getTitle())
                        .cardEntity(cardEntity)
                        .build();
                checklistRepository.save(newChecklistEntity);
            }
        }
    }

    public int patchCard(CardDTO cardDTO) {
        Optional<PlannerEntity> optionalPlanner = plannerRepository.findById(cardDTO.getPlannerId());
        if(optionalPlanner.isPresent()) {
            Optional<CardEntity> optionalCardEntity = cardRepository.findById(cardDTO.getCardId());
            if(optionalCardEntity.isPresent()) {
                CardEntity originalCardEntity = optionalCardEntity.get();
                List<ChecklistEntity> originalChecklistEntities = originalCardEntity.getChecklists();
                List<ChecklistDTO> updatedChecklistDTOS = cardDTO.getChecklists();
                List<ChecklistEntity> newChecklistEntities = new ArrayList<>();

                for(ChecklistDTO ChecklistDTO : updatedChecklistDTOS) {
                    Optional<ChecklistEntity> optionalChecklistEntity = checklistRepository.findById(ChecklistDTO.getChecklistId());
                    if(optionalChecklistEntity.isPresent()) {
                        ChecklistEntity originalChecklistEntity = optionalChecklistEntity.get();
                        ChecklistEntity newChecklistEntity = ChecklistEntity.builder()
                                .checklistId(ChecklistDTO.getChecklistId())
                                .title(ChecklistDTO.getTitle())
                                .checked(ChecklistDTO.getChecked())
                                .createdAt(originalChecklistEntity.getCreatedAt())
                                .cardEntity(originalCardEntity)
                                .build();
                        checklistRepository.save(newChecklistEntity);
                    } else {
                        return 0;
                    }
                }


                PlannerEntity plannerEntity = optionalPlanner.get();
                CardEntity updatedCardEntity = CardEntity.builder()
                        .cardId(cardDTO.getCardId())
                        .title(cardDTO.getTitle())
                        .coverColor(cardDTO.getCoverColor())
                        .post(cardDTO.getPost())
                        .intOrder(cardDTO.getIntOrder())
                        .startDate(cardDTO.getStartDate())
                        .endDate(cardDTO.getEndDate())
                        .cardStatus(cardDTO.getCardStatus())
                        .createdAt(originalCardEntity.getCreatedAt())
                        .plannerEntity(plannerEntity)
                        .build();
                cardRepository.save(updatedCardEntity);
                return 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    public int changeCardOrder(RequestChangeCardOrderDTO requestChangeCardOrderDTO) {
        Optional<PlannerEntity> optionalPlannerEntity = plannerRepository.findById(requestChangeCardOrderDTO.getPlannerId());
        if(optionalPlannerEntity.isPresent()) {
            PlannerEntity originalPlannerEntity = optionalPlannerEntity.get();

            Optional<CardEntity> optionalCardEntity = cardRepository.findById(requestChangeCardOrderDTO.getSourceCardId());
            if(optionalCardEntity.isPresent()) {
                CardEntity originalCardEntity = optionalCardEntity.get();

                cardRepository.handleOriginalPosition(requestChangeCardOrderDTO);
                cardRepository.handleNewPosition(requestChangeCardOrderDTO);

                CardEntity updatedCardEntity = CardEntity.builder()
                        .cardId(originalCardEntity.getCardId())
                        .title(originalCardEntity.getTitle())
                        .coverColor(originalCardEntity.getCoverColor())
                        .post(originalCardEntity.getPost())
                        .intOrder(requestChangeCardOrderDTO.getDestinationCardOrder())
                        .startDate(originalCardEntity.getStartDate())
                        .endDate(originalCardEntity.getEndDate())
                        .cardStatus(requestChangeCardOrderDTO.getDestinationCardStatus())
                        .createdAt(originalCardEntity.getCreatedAt())
                        .plannerEntity(originalPlannerEntity)
                        .build();

                cardRepository.save(updatedCardEntity);
                return 1;
            } else {
                return 0;
            }

        } else {
            return 0;
        }


    }

    public int deleteCard(long cardId) {
        Optional<CardEntity> card = cardRepository.findById(cardId);
        if(card.isEmpty()) {
            return 0;
        }
        cardRepository.deleteById(cardId);
        Optional<CardEntity> deletedCard = cardRepository.findById(cardId);
        if(deletedCard.isEmpty()) {
            return 1;
        } else {
            return 0;
        }
    }
}
