(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class M{constructor(){this.gameData=null,this.currentSession=null}async init(){console.log("💾 DataManager initializing..."),this.loadFromStorage()}loadFromStorage(){try{const e=localStorage.getItem("boltManager_gameData"),t=localStorage.getItem("boltManager_currentSession");e&&(this.gameData=JSON.parse(e),console.log("📂 Game data loaded from localStorage")),t&&(this.currentSession=JSON.parse(t),console.log("📂 Current session loaded from localStorage"))}catch(e){console.error("Error loading data from storage:",e)}}saveToStorage(e,t){try{e&&(localStorage.setItem("boltManager_gameData",JSON.stringify(e)),this.gameData=e),t&&(localStorage.setItem("boltManager_currentSession",JSON.stringify(t)),this.currentSession=t),console.log("💾 Data saved to localStorage")}catch(a){console.error("Error saving data to storage:",a)}}getGameData(){return this.gameData}getCurrentSession(){return this.currentSession}clearStorage(){localStorage.removeItem("boltManager_gameData"),localStorage.removeItem("boltManager_currentSession"),this.gameData=null,this.currentSession=null,console.log("🗑️ Storage cleared")}}class D{constructor(e){this.gameManager=e}async execute(e){try{console.log("💰 Executing Transfer_Offer flow...",e);const t=this.validateOfferParams(e);if(!t.isValid)throw new Error(t.error);const a=this.verifyBudget(e.fromTeamId,e.transferFee,e.signingBonus);if(!a.sufficient)throw new Error(`Budget insufficiente. Disponibile: €${a.available}, Richiesto: €${a.required}`);const s=this.gameManager.gameData.players.find(l=>l.id===e.playerId),n=this.calculateMarketValue(s),i=this.calculateAcceptanceProbability(e,n,s),o=this.generateResponse(e,i,n),r=this.createTransferRecord(e,o,n);return this.gameManager.gameData.transfers.push(r),this.generateTransferEvents(r,o),this.setNegotiationDeadline(r),console.log("✅ Transfer offer completed:",r.id),{success:!0,transferId:r.id,response:o,acceptanceProbability:i,marketValue:n,negotiationStatus:r.negotiation_status}}catch(t){return console.error("❌ Transfer_Offer flow error:",t),this.generateErrorEvent(e,t.message),{success:!1,error:t.message}}}validateOfferParams(e){const t=["playerId","fromTeamId","toTeamId","transferFee","playerSalary","contractLength","transferType"];for(const o of t)if(e[o]===void 0||e[o]===null)return{isValid:!1,error:`Campo obbligatorio mancante: ${o}`};const a=this.gameManager.gameData.players.find(o=>o.id===e.playerId);if(!a)return{isValid:!1,error:"Giocatore non trovato"};const s=this.gameManager.gameData.teams.find(o=>o.id===e.fromTeamId),n=this.gameManager.gameData.teams.find(o=>o.id===e.toTeamId);return!s||!n?{isValid:!1,error:"Una o entrambe le squadre non esistono"}:a.team_id!==e.toTeamId?{isValid:!1,error:"Il giocatore non appartiene alla squadra specificata"}:e.transferFee<0||e.playerSalary<=0||e.contractLength<=0?{isValid:!1,error:"I valori economici devono essere positivi"}:["permanent","loan","free_transfer","exchange"].includes(e.transferType)?{isValid:!0}:{isValid:!1,error:"Tipo trasferimento non valido"}}verifyBudget(e,t,a=0){const s=this.gameManager.gameData.teams.find(i=>i.id===e),n=t+a;return{sufficient:s.budget>=n,available:s.budget,required:n,remaining:s.budget-n}}calculateMarketValue(e){let t=e.overall_rating*1e5;const a=e.age<=20?1.2:e.age<=25?1.4:e.age<=28?1.3:e.age<=32?1:.7,s=(e.potential-e.overall_rating)*1e4,n=e.position==="GK"?.8:e.position==="ATT"?1.3:e.position==="MID"?1.1:1,i=(e.fitness+e.morale)/200,o=Math.round(t*a*n*i+s);return Math.max(o,5e4)}calculateAcceptanceProbability(e,t,a){let s=50;const n=e.transferFee/t;n>=1.5?s+=40:n>=1.2?s+=25:n>=1?s+=10:n>=.8?s-=10:s-=30;const i=e.playerSalary/a.salary;i>=1.5?s+=20:i>=1.2?s+=10:i<1&&(s-=15),a.morale>=80?s-=10:a.morale<=40&&(s+=15);const o=this.gameManager.gameData.teams.find(l=>l.id===e.fromTeamId),r=this.gameManager.gameData.teams.find(l=>l.id===e.toTeamId);return o.league_position&&r.league_position&&(o.league_position<r.league_position?s+=15:o.league_position>r.league_position&&(s-=10)),e.transferType==="free_transfer"?s+=20:e.transferType==="loan"&&(s+=10),Math.max(0,Math.min(100,s))}generateResponse(e,t,a){const s=Math.random()*100;return s<=t?{type:"accepted",message:"Offerta accettata dalla squadra proprietaria",finalTerms:{transferFee:e.transferFee,playerSalary:e.playerSalary,contractLength:e.contractLength,signingBonus:e.signingBonus||0,releaseClause:e.releaseClause||null}}:s<=t+30?{type:"counter_offer",message:"Controproposta ricevuta",counterTerms:this.generateCounterOffer(e,a)}:{type:"rejected",message:"Offerta rifiutata",reason:this.generateRejectionReason(e,a)}}generateCounterOffer(e,t){const a=.1+Math.random()*.2;return{transferFee:Math.round(e.transferFee*(1+a)),playerSalary:Math.round(e.playerSalary*1.1),contractLength:e.contractLength,signingBonus:(e.signingBonus||0)+5e4,additionalClauses:["Bonus prestazioni: €100,000","Percentuale su futura rivendita: 10%"]}}generateRejectionReason(e,t){const a=["Offerta economica insufficiente","Giocatore non interessato al trasferimento","Squadra non intende vendere in questo momento","Richiesta clausole contrattuali aggiuntive","Periodo di trasferimento non idoneo"];return e.transferFee<t*.8?"Offerta economica troppo bassa rispetto al valore del giocatore":a[Math.floor(Math.random()*a.length)]}createTransferRecord(e,t,a){return{id:`transfer_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,player_id:e.playerId,from_team_id:e.fromTeamId,to_team_id:e.toTeamId,transfer_type:e.transferType,transfer_fee:e.transferFee,player_salary:e.playerSalary,contract_length:e.contractLength,signing_bonus:e.signingBonus||0,release_clause:e.releaseClause||null,agent_fee:Math.round(e.transferFee*.05),loan_duration:e.transferType==="loan"?e.loanDuration||12:null,loan_fee:e.transferType==="loan"?e.loanFee||0:null,buy_option:e.transferType==="loan"?e.buyOption:null,negotiation_status:t.type==="accepted"?"agreed":t.type==="counter_offer"?"negotiating":"failed",offer_history:[{date:new Date().toISOString(),type:"initial_offer",terms:{transferFee:e.transferFee,playerSalary:e.playerSalary,contractLength:e.contractLength},response:t}],player_agreement:t.type==="accepted",medical_passed:!1,announcement_date:null,transfer_window:this.getCurrentTransferWindow(),is_user_involved:this.isUserInvolved(e.fromTeamId,e.toTeamId),market_value_at_offer:a,created_at:new Date().toISOString(),completed_at:null,updated_at:new Date().toISOString()}}generateTransferEvents(e,t){const a=this.gameManager.gameData.players.find(c=>c.id===e.player_id),s=this.gameManager.gameData.teams.find(c=>c.id===e.from_team_id),n=this.gameManager.gameData.teams.find(c=>c.id===e.to_team_id),i=`${a.first_name} ${a.last_name}`;let o,r,l;switch(t.type){case"accepted":o=`Trasferimento Accordato: ${i}`,r=`${s.name} ha raggiunto un accordo con ${n.name} per il trasferimento di ${i} per €${e.transfer_fee.toLocaleString()}`,l="success";break;case"counter_offer":o=`Controproposta: ${i}`,r=`${n.name} ha fatto una controproposta per ${i}. Nuova richiesta: €${t.counterTerms.transferFee.toLocaleString()}`,l="warning";break;case"rejected":o=`Offerta Rifiutata: ${i}`,r=`${n.name} ha rifiutato l'offerta di ${s.name} per ${i}. Motivo: ${t.reason}`,l="error";break}const d={id:`event_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,event_type:"transfer",event_category:l,title:o,description:r,related_entity_type:"transfer",related_entity_id:e.id,team_id:e.is_user_involved?s.is_user_team?s.id:n.id:null,player_id:e.player_id,match_id:null,priority:e.is_user_involved?4:2,is_read:!1,is_user_relevant:e.is_user_involved,auto_generated:!0,expires_at:null,action_required:t.type==="counter_offer"&&e.is_user_involved,action_type:t.type==="counter_offer"?"respond_to_counter_offer":null,action_data:t.type==="counter_offer"?JSON.stringify(t.counterTerms):null,event_date:new Date().toISOString(),game_date:this.gameManager.getCurrentDate(),created_at:new Date().toISOString()};this.gameManager.gameData.gameEvents.push(d)}generateErrorEvent(e,t){const a={id:`event_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,event_type:"transfer",event_category:"error",title:"Errore Trasferimento",description:`Errore durante la trattativa: ${t}`,related_entity_type:"player",related_entity_id:e.playerId,team_id:e.fromTeamId,player_id:e.playerId,match_id:null,priority:3,is_read:!1,is_user_relevant:this.isUserInvolved(e.fromTeamId,e.toTeamId),auto_generated:!0,expires_at:null,action_required:!1,action_type:null,action_data:null,event_date:new Date().toISOString(),game_date:this.gameManager.getCurrentDate(),created_at:new Date().toISOString()};this.gameManager.gameData.gameEvents.push(a)}setNegotiationDeadline(e){const t=new Date(this.gameManager.getCurrentDate());t.setDate(t.getDate()+7),e.negotiation_deadline=t.toISOString()}getCurrentTransferWindow(){const t=new Date(this.gameManager.getCurrentDate()).getMonth()+1;return t>=6&&t<=8?"summer":t>=1&&t<=2?"winter":"emergency"}isUserInvolved(e,t){const a=this.gameManager.gameData.teams.find(s=>s.is_user_team);return a&&(a.id===e||a.id===t)}}class ${constructor(e){this.gameManager=e}async execute(e){try{console.log("🔄 Executing Transfer_Process flow...",e);const t=this.validateProcessParams(e);if(!t.isValid)throw new Error(t.error);const a=this.gameManager.gameData.transfers.find(n=>n.id===e.transferId);if(!a)throw new Error("Trattativa non trovata");if(a.negotiation_status==="completed"||a.negotiation_status==="failed")throw new Error("Trattativa già conclusa");let s;switch(e.decision){case"accept":s=await this.processAcceptedTransfer(a,e);break;case"reject":s=await this.processRejectedTransfer(a,e);break;case"expire":s=await this.processExpiredTransfer(a);break;default:throw new Error("Decisione non valida")}return this.updateTransferRecord(a,e,s),this.generateCompletionEvents(a,s),console.log("✅ Transfer process completed:",s.status),{success:!0,transferId:a.id,status:s.status,details:s}}catch(t){return console.error("❌ Transfer_Process flow error:",t),this.generateErrorEvent(e,t.message),{success:!1,error:t.message}}}validateProcessParams(e){return e.transferId?["accept","reject","expire"].includes(e.decision)?{isValid:!0}:{isValid:!1,error:"Decisione non valida"}:{isValid:!1,error:"ID trattativa mancante"}}async processAcceptedTransfer(e,t){if(console.log("✅ Processing accepted transfer..."),t.medicalPassed===!1)return{status:"failed",reason:"Visite mediche non superate",refundRequired:!0};const a=t.finalTerms||this.extractTermsFromRecord(e),s=this.verifyFinalBudget(e.from_team_id,a);if(!s.sufficient)return{status:"failed",reason:"Budget insufficiente per completare il trasferimento",budgetShortfall:s.shortfall};const n=this.executePlayerTransfer(e,a);return this.updateTeamBudgets(e,a),this.updatePlayerContract(e,a),this.updateMoraleAfterTransfer(e,"completed"),{status:"completed",playerTransferred:!0,finalTerms:a,transferDetails:n}}async processRejectedTransfer(e,t){return console.log("❌ Processing rejected transfer..."),this.updateMoraleAfterTransfer(e,"rejected"),this.releaseBudgetHold(e),{status:"failed",reason:t.rejectionReason||"Trattativa rifiutata",playerTransferred:!1}}async processExpiredTransfer(e){return console.log("⏰ Processing expired transfer..."),this.updateMoraleAfterTransfer(e,"expired"),this.releaseBudgetHold(e),{status:"failed",reason:"Trattativa scaduta per timeout",playerTransferred:!1}}extractTermsFromRecord(e){return{transferFee:e.transfer_fee,playerSalary:e.player_salary,contractLength:e.contract_length,signingBonus:e.signing_bonus,releaseClause:e.release_clause,agentFee:e.agent_fee}}verifyFinalBudget(e,t){const a=this.gameManager.gameData.teams.find(n=>n.id===e),s=t.transferFee+t.signingBonus+t.agentFee;return{sufficient:a.budget>=s,available:a.budget,required:s,shortfall:Math.max(0,s-a.budget)}}executePlayerTransfer(e,t){const a=this.gameManager.gameData.players.find(o=>o.id===e.player_id),s=this.gameManager.gameData.teams.find(o=>o.id===e.from_team_id),n=this.gameManager.gameData.teams.find(o=>o.id===e.to_team_id),i=a.team_id;return a.team_id=e.from_team_id,a.matches_played=0,a.goals_scored=0,a.assists=0,a.yellow_cards=0,a.red_cards=0,a.updated_at=new Date().toISOString(),{playerId:a.id,playerName:`${a.first_name} ${a.last_name}`,fromTeam:s.name,toTeam:n.name,previousTeamId:i,newTeamId:a.team_id,transferDate:new Date().toISOString()}}updateTeamBudgets(e,t){const a=this.gameManager.gameData.teams.find(o=>o.id===e.from_team_id),s=this.gameManager.gameData.teams.find(o=>o.id===e.to_team_id),n=t.transferFee+t.signingBonus+t.agentFee;a.budget-=n;const i=t.transferFee*.95;s.budget+=i,a.updated_at=new Date().toISOString(),s.updated_at=new Date().toISOString(),console.log(`💰 Budget updated - ${a.name}: -€${n}, ${s.name}: +€${i}`)}updatePlayerContract(e,t){const a=this.gameManager.gameData.players.find(i=>i.id===e.player_id);a.salary=t.playerSalary;const s=new Date(this.gameManager.getCurrentDate());s.setFullYear(s.getFullYear()+t.contractLength),a.contract_expires=s.toISOString();const n=t.transferFee*.1;a.market_value=Math.round(a.market_value+n),a.updated_at=new Date().toISOString(),console.log(`📝 Contract updated for ${a.first_name} ${a.last_name}: €${t.playerSalary}/week until ${s.toDateString()}`)}updateMoraleAfterTransfer(e,t){const a=this.gameManager.gameData.players.find(l=>l.id===e.player_id),s=this.gameManager.gameData.teams.find(l=>l.id===e.from_team_id),n=this.gameManager.gameData.teams.find(l=>l.id===e.to_team_id);let i=0,o=0,r=0;switch(t){case"completed":i=15,o=5,r=-2;break;case"rejected":i=-10,o=-3,r=0;break;case"expired":i=-5,o=-2,r=-1;break}a.morale=Math.max(0,Math.min(100,a.morale+i)),s.team_morale=Math.max(0,Math.min(100,s.team_morale+o)),n.team_morale=Math.max(0,Math.min(100,n.team_morale+r)),this.updateMoraleStatus(a.id,"player",i,"transfer"),this.updateMoraleStatus(s.id,"team",o,"transfer"),this.updateMoraleStatus(n.id,"team",r,"transfer")}updateMoraleStatus(e,t,a,s){var i,o;let n=this.gameManager.gameData.moraleStatus.find(r=>r.entity_id===e&&r.entity_type===t);n?(n.transfer_impact+=a,n.current_morale=Math.max(0,Math.min(100,n.current_morale+a)),n.morale_trend=a>0?"rising":a<0?"declining":"stable",n.last_significant_event=s,n.event_date=new Date().toISOString(),n.updated_at=new Date().toISOString()):(n={id:`morale_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,entity_type:t,entity_id:e,current_morale:t==="player"?((i=this.gameManager.gameData.players.find(r=>r.id===e))==null?void 0:i.morale)||50:((o=this.gameManager.gameData.teams.find(r=>r.id===e))==null?void 0:o.team_morale)||50,base_morale:50,recent_results_impact:0,training_impact:0,transfer_impact:a,injury_impact:0,team_chemistry_impact:0,fan_support_impact:0,media_pressure_impact:0,personal_issues_impact:0,achievement_impact:0,morale_trend:a>0?"rising":a<0?"declining":"stable",last_significant_event:s,event_date:new Date().toISOString(),recovery_rate:1,stability_factor:1,next_evaluation:new Date(Date.now()+7*24*60*60*1e3).toISOString(),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},this.gameManager.gameData.moraleStatus.push(n))}releaseBudgetHold(e){console.log(`💰 Released budget hold for transfer ${e.id}`)}updateTransferRecord(e,t,a){e.negotiation_status=a.status==="completed"?"completed":"failed",e.player_agreement=a.status==="completed",e.medical_passed=t.medicalPassed!==!1,e.completed_at=new Date().toISOString(),e.updated_at=new Date().toISOString(),a.status==="completed"&&(e.announcement_date=new Date().toISOString()),e.offer_history.push({date:new Date().toISOString(),type:"final_decision",decision:t.decision,result:a})}generateCompletionEvents(e,t){const a=this.gameManager.gameData.players.find(c=>c.id===e.player_id),s=this.gameManager.gameData.teams.find(c=>c.id===e.from_team_id),n=this.gameManager.gameData.teams.find(c=>c.id===e.to_team_id),i=`${a.first_name} ${a.last_name}`;let o,r,l;t.status==="completed"?(o=`Trasferimento Ufficiale: ${i}`,r=`${i} si trasferisce ufficialmente da ${n.name} a ${s.name} per €${e.transfer_fee.toLocaleString()}. Contratto fino al ${new Date(a.contract_expires).toLocaleDateString()}.`,l="success"):(o=`Trasferimento Fallito: ${i}`,r=`Il trasferimento di ${i} da ${n.name} a ${s.name} è fallito. Motivo: ${t.reason}`,l="error");const d={id:`event_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,event_type:"transfer",event_category:l,title:o,description:r,related_entity_type:"transfer",related_entity_id:e.id,team_id:e.is_user_involved?s.is_user_team?s.id:n.id:null,player_id:e.player_id,match_id:null,priority:e.is_user_involved?5:3,is_read:!1,is_user_relevant:e.is_user_involved,auto_generated:!0,expires_at:null,action_required:!1,action_type:null,action_data:null,event_date:new Date().toISOString(),game_date:this.gameManager.getCurrentDate(),created_at:new Date().toISOString()};this.gameManager.gameData.gameEvents.push(d)}generateErrorEvent(e,t){const a={id:`event_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,event_type:"transfer",event_category:"error",title:"Errore Completamento Trasferimento",description:`Errore durante il completamento della trattativa: ${t}`,related_entity_type:"transfer",related_entity_id:e.transferId,team_id:null,player_id:null,match_id:null,priority:3,is_read:!1,is_user_relevant:!0,auto_generated:!0,expires_at:null,action_required:!1,action_type:null,action_data:null,event_date:new Date().toISOString(),game_date:this.gameManager.getCurrentDate(),created_at:new Date().toISOString()};this.gameManager.gameData.gameEvents.push(a)}}class E{constructor(e){this.gameManager=e}async execute(e){try{console.log("👥 Executing Staff_AssignRole flow...",e);const t=this.validateAssignmentParams(e);if(!t.isValid)throw new Error(t.error);const a=this.gameManager.gameData.staff.find(r=>r.id===e.staffId);if(!a)throw new Error("Membro dello staff non trovato");const s=this.checkRoleCompatibility(a,e.newRole);s.compatible||console.warn("⚠️ Role compatibility warning:",s.warning);const n=this.calculateTeamBonuses(a.team_id),i=this.updateStaffRole(a,e),o=this.calculateTeamBonuses(a.team_id);return this.updateTeamBonuses(a.team_id,o),e.teamId&&e.teamId!==a.team_id&&await this.processTeamTransfer(a,e.teamId,n),this.updateMoraleAfterRoleChange(a,i),this.generateRoleChangeEvents(a,i),console.log("✅ Staff role assignment completed:",i),{success:!0,staffId:a.id,roleUpdate:i,bonusChanges:{old:n,new:o},compatibility:s}}catch(t){return console.error("❌ Staff_AssignRole flow error:",t),this.generateErrorEvent(e,t.message),{success:!1,error:t.message}}}validateAssignmentParams(e){return e.staffId?e.newRole?["head_coach","assistant_coach","fitness_coach","goalkeeping_coach","scout","chief_scout","physio","team_doctor","analyst","youth_coach","technical_director","sporting_director"].includes(e.newRole)?e.teamId&&!this.gameManager.gameData.teams.find(s=>s.id===e.teamId)?{isValid:!1,error:"Squadra di destinazione non trovata"}:{isValid:!0}:{isValid:!1,error:"Ruolo non valido"}:{isValid:!1,error:"Nuovo ruolo mancante"}:{isValid:!1,error:"ID staff mancante"}}checkRoleCompatibility(e,t){const a=e.role,s=e.experience_years,i={head_coach:{from:["assistant_coach","youth_coach"],minExperience:5,requiredSkills:["coaching_ability","tactical_knowledge","motivational_skills"]},assistant_coach:{from:["fitness_coach","youth_coach","analyst"],minExperience:2,requiredSkills:["coaching_ability","tactical_knowledge"]},fitness_coach:{from:["physio","assistant_coach"],minExperience:1,requiredSkills:["fitness_expertise"]},scout:{from:["analyst","youth_coach"],minExperience:1,requiredSkills:["scouting_ability"]},chief_scout:{from:["scout"],minExperience:3,requiredSkills:["scouting_ability"]},technical_director:{from:["head_coach","chief_scout"],minExperience:8,requiredSkills:["coaching_ability","tactical_knowledge","scouting_ability"]}}[t];if(!i)return{compatible:!0,warning:null};if(s<i.minExperience)return{compatible:!1,warning:`Esperienza insufficiente. Richiesta: ${i.minExperience} anni, attuale: ${s} anni`};if(i.from.length>0&&!i.from.includes(a))return{compatible:!0,warning:`Transizione inusuale da ${a} a ${t}. Potrebbe influire sull'efficacia.`};const o=i.requiredSkills.filter(r=>(e[r]||0)<60);return o.length>0?{compatible:!0,warning:`Competenze da migliorare: ${o.join(", ")}`}:{compatible:!0,warning:null}}updateStaffRole(e,t){const a=e.role,s=e.specialization,n=e.is_head_of_department;if(e.role=t.newRole,t.specialization&&(e.specialization=t.specialization),t.isHeadOfDepartment!==void 0&&(e.is_head_of_department=t.isHeadOfDepartment),t.salaryAdjustment){const i=Math.max(0,e.salary+t.salaryAdjustment);e.salary=i}else e.salary=this.calculateRoleSalary(t.newRole,e.experience_years);return e.updated_at=new Date().toISOString(),{staffId:e.id,staffName:`${e.first_name} ${e.last_name}`,previousRole:a,newRole:t.newRole,previousSpecialization:s,newSpecialization:e.specialization,previousIsHead:n,newIsHead:e.is_head_of_department,salaryChange:t.salaryAdjustment||0,newSalary:e.salary}}calculateRoleSalary(e,t){const s={head_coach:15e3,assistant_coach:8e3,fitness_coach:5e3,goalkeeping_coach:4e3,scout:3e3,chief_scout:7e3,physio:3500,team_doctor:6e3,analyst:4e3,youth_coach:3500,technical_director:2e4,sporting_director:18e3}[e]||3e3,n=1+t*.05;return Math.round(s*n)}calculateTeamBonuses(e){const t=this.gameManager.gameData.staff.filter(s=>s.team_id===e);let a={training_efficiency:0,injury_prevention:0,tactical_bonus:0,morale_bonus:0,scouting_bonus:0,youth_development:0};return t.forEach(s=>{const n=s.is_head_of_department?1.5:1;switch(s.role){case"head_coach":a.training_efficiency+=(s.coaching_ability||50)*.2*n,a.tactical_bonus+=(s.tactical_knowledge||50)*.3*n,a.morale_bonus+=(s.motivational_skills||50)*.2*n;break;case"fitness_coach":a.training_efficiency+=(s.fitness_expertise||50)*.3*n,a.injury_prevention+=(s.fitness_expertise||50)*.4*n;break;case"scout":case"chief_scout":a.scouting_bonus+=(s.scouting_ability||50)*.5*n;break;case"physio":case"team_doctor":a.injury_prevention+=(s.medical_expertise||50)*.3*n;break;case"youth_coach":a.youth_development+=(s.coaching_ability||50)*.4*n;break}}),Object.keys(a).forEach(s=>{a[s]=Math.min(100,Math.max(0,a[s]))}),a}updateTeamBonuses(e,t){const a=this.gameManager.gameData.teams.find(s=>s.id===e);a&&(a.staff_bonuses=t,a.updated_at=new Date().toISOString(),console.log(`📊 Updated team bonuses for ${a.name}:`,t))}async processTeamTransfer(e,t,a){const s=e.team_id,n=this.gameManager.gameData.teams.find(r=>r.id===s),i=this.gameManager.gameData.teams.find(r=>r.id===t);e.team_id=t;const o=this.calculateTeamBonuses(s);this.updateTeamBonuses(s,o),n&&(n.team_morale=Math.max(0,n.team_morale-3)),i&&(i.team_morale=Math.min(100,i.team_morale+2)),console.log(`🔄 Staff transferred from ${n==null?void 0:n.name} to ${i==null?void 0:i.name}`)}updateMoraleAfterRoleChange(e,t){let a=0;this.isPromotion(t.previousRole,t.newRole)?a=15:this.isDemotion(t.previousRole,t.newRole)?a=-10:a=5,t.salaryChange>0?a+=5:t.salaryChange<0&&(a-=8),e.morale=Math.max(0,Math.min(100,e.morale+a));const s=this.gameManager.gameData.teams.find(n=>n.id===e.team_id);if(s){const n=a>0?1:-1;s.team_morale=Math.max(0,Math.min(100,s.team_morale+n))}this.updateMoraleStatus(e.id,"staff",a,"role_change")}isPromotion(e,t){const a={assistant_coach:1,fitness_coach:1,scout:1,physio:1,analyst:1,youth_coach:1,goalkeeping_coach:2,team_doctor:2,chief_scout:3,head_coach:4,technical_director:5,sporting_director:5};return(a[t]||0)>(a[e]||0)}isDemotion(e,t){const a={assistant_coach:1,fitness_coach:1,scout:1,physio:1,analyst:1,youth_coach:1,goalkeeping_coach:2,team_doctor:2,chief_scout:3,head_coach:4,technical_director:5,sporting_director:5};return(a[t]||0)<(a[e]||0)}updateMoraleStatus(e,t,a,s){var i;let n=this.gameManager.gameData.moraleStatus.find(o=>o.entity_id===e&&o.entity_type===t);n?(n.transfer_impact+=a,n.current_morale=Math.max(0,Math.min(100,n.current_morale+a)),n.morale_trend=a>0?"rising":a<0?"declining":"stable",n.last_significant_event=s,n.event_date=new Date().toISOString(),n.updated_at=new Date().toISOString()):(n={id:`morale_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,entity_type:t,entity_id:e,current_morale:t==="staff"&&((i=this.gameManager.gameData.staff.find(o=>o.id===e))==null?void 0:i.morale)||50,base_morale:50,recent_results_impact:0,training_impact:0,transfer_impact:a,injury_impact:0,team_chemistry_impact:0,fan_support_impact:0,media_pressure_impact:0,personal_issues_impact:0,achievement_impact:0,morale_trend:a>0?"rising":a<0?"declining":"stable",last_significant_event:s,event_date:new Date().toISOString(),recovery_rate:1,stability_factor:1,next_evaluation:new Date(Date.now()+7*24*60*60*1e3).toISOString(),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},this.gameManager.gameData.moraleStatus.push(n))}generateRoleChangeEvents(e,t){const a=this.gameManager.gameData.teams.find(l=>l.id===e.team_id),s=`${e.first_name} ${e.last_name}`;let n,i,o;this.isPromotion(t.previousRole,t.newRole)?(n=`Promozione Staff: ${s}`,i=`${s} è stato promosso da ${t.previousRole} a ${t.newRole} in ${a==null?void 0:a.name}`,o="success"):this.isDemotion(t.previousRole,t.newRole)?(n=`Cambio Ruolo: ${s}`,i=`${s} è stato riassegnato da ${t.previousRole} a ${t.newRole} in ${a==null?void 0:a.name}`,o="warning"):(n=`Nuovo Ruolo: ${s}`,i=`${s} ha cambiato ruolo da ${t.previousRole} a ${t.newRole} in ${a==null?void 0:a.name}`,o="info");const r={id:`event_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,event_type:"staff",event_category:o,title:n,description:i,related_entity_type:"staff",related_entity_id:e.id,team_id:a!=null&&a.is_user_team?a.id:null,player_id:null,match_id:null,priority:a!=null&&a.is_user_team?3:1,is_read:!1,is_user_relevant:(a==null?void 0:a.is_user_team)||!1,auto_generated:!0,expires_at:null,action_required:!1,action_type:null,action_data:null,event_date:new Date().toISOString(),game_date:this.gameManager.getCurrentDate(),created_at:new Date().toISOString()};this.gameManager.gameData.gameEvents.push(r)}generateErrorEvent(e,t){const a={id:`event_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,event_type:"staff",event_category:"error",title:"Errore Assegnazione Ruolo Staff",description:`Errore durante l'assegnazione del ruolo: ${t}`,related_entity_type:"staff",related_entity_id:e.staffId,team_id:null,player_id:null,match_id:null,priority:2,is_read:!1,is_user_relevant:!0,auto_generated:!0,expires_at:null,action_required:!1,action_type:null,action_data:null,event_date:new Date().toISOString(),game_date:this.gameManager.getCurrentDate(),created_at:new Date().toISOString()};this.gameManager.gameData.gameEvents.push(a)}}class T{constructor(e){this.gameManager=e}async execute(e){try{console.log("📈 Executing Report_CompileHistory flow...",e);const t=this.validateReportParams(e);if(!t.isValid)throw new Error(t.error);const a=Array.isArray(e.playerIds)?e.playerIds:[e.playerIds],s=this.validatePlayers(a);if(s.length===0)throw new Error("Nessun giocatore valido trovato");const n=this.loadHistoricalData(a,e.startDate,e.endDate),i=[];for(const c of s){const u=await this.compilePlayerReport(c,n,e);i.push(u)}const o=this.generateComparativeAnalysis(i,e),r=this.calculateAggregateStatistics(i,e),l=this.generateInsights(i,o),d=this.compileFinalReport({playerReports:i,comparativeAnalysis:o,aggregateStats:r,insights:l,metadata:{generatedAt:new Date().toISOString(),period:{start:e.startDate,end:e.endDate},dataTypes:e.dataTypes,analysisType:e.analysisType,playersAnalyzed:s.length}});return e.saveReport&&await this.saveHistoryReport(d,e.reportName),console.log("✅ History report compiled successfully"),{success:!0,report:d,playersAnalyzed:s.length,dataPointsProcessed:this.countDataPoints(n),reportId:e.saveReport?d.id:null}}catch(t){return console.error("❌ Report_CompileHistory flow error:",t),{success:!1,error:t.message}}}validateReportParams(e){if(!e.playerIds)return{isValid:!1,error:"ID giocatore/i mancante"};if(!e.startDate||!e.endDate)return{isValid:!1,error:"Intervallo temporale incompleto"};const t=new Date(e.startDate),a=new Date(e.endDate);if(isNaN(t.getTime())||isNaN(a.getTime()))return{isValid:!1,error:"Date non valide"};if(t>=a)return{isValid:!1,error:"Data inizio deve essere precedente alla data fine"};const s=2*365*24*60*60*1e3;if(a-t>s)return{isValid:!1,error:"Intervallo temporale troppo ampio (max 2 anni)"};const n=["attributes","morale","matches","all"];if(!(e.dataTypes||["all"]).every(r=>n.includes(r)))return{isValid:!1,error:"Tipi dati non validi"};const o=["individual","comparison","team_average"];return e.analysisType&&!o.includes(e.analysisType)?{isValid:!1,error:"Tipo analisi non valido"}:{isValid:!0}}validatePlayers(e){const t=[];return e.forEach(a=>{const s=this.gameManager.gameData.players.find(n=>n.id===a);s?t.push(s):console.warn(`Player not found: ${a}`)}),t}loadHistoricalData(e,t,a){var d,c,u,g;const s=new Date(t),n=new Date(a),i=((d=this.gameManager.gameData.attributesHistory)==null?void 0:d.filter(p=>{const m=new Date(p.record_date);return e.includes(p.player_id)&&m>=s&&m<=n}))||[],o=((c=this.gameManager.gameData.moraleStatus)==null?void 0:c.filter(p=>{const m=new Date(p.updated_at);return p.entity_type==="player"&&e.includes(p.entity_id)&&m>=s&&m<=n}))||[],r=((u=this.gameManager.gameData.matches)==null?void 0:u.filter(p=>{const m=new Date(p.match_date);return m>=s&&m<=n&&p.status==="finished"}))||[],l=((g=this.gameManager.gameData.matchReports)==null?void 0:g.filter(p=>{var v;return r.find(h=>h.id===p.match_id)&&((v=p.player_ratings)==null?void 0:v.some(h=>e.includes(h.player_id)))}))||[];return{attributesHistory:i,moraleHistory:o,matchesHistory:r,matchReports:l}}async compilePlayerReport(e,t,a){console.log(`📊 Compiling report for ${e.first_name} ${e.last_name}...`);const s={playerId:e.id,playerName:`${e.first_name} ${e.last_name}`,position:e.position,age:e.age,currentRating:e.overall_rating,potential:e.potential};return this.shouldIncludeDataType("attributes",a.dataTypes)&&(s.attributesEvolution=this.analyzeAttributesEvolution(e.id,t.attributesHistory)),this.shouldIncludeDataType("morale",a.dataTypes)&&(s.moraleEvolution=this.analyzeMoraleEvolution(e.id,t.moraleHistory)),this.shouldIncludeDataType("matches",a.dataTypes)&&(s.matchPerformance=this.analyzeMatchPerformance(e.id,t.matchesHistory,t.matchReports)),s.overallTrends=this.calculateOverallTrends(s),s.keyMoments=this.identifyKeyMoments(e.id,t),a.includeProjections&&(s.futureProjections=this.generateFutureProjections(s,e)),s}shouldIncludeDataType(e,t){return t.includes("all")||t.includes(e)}analyzeAttributesEvolution(e,t){const a=t.filter(c=>c.player_id===e).sort((c,u)=>new Date(c.record_date)-new Date(u.record_date));if(a.length===0)return{timeline:[],trends:{},significantChanges:[],totalImprovement:0};const s=a.map(c=>({date:c.record_date,overall_rating:c.overall_rating,pace:c.pace,shooting:c.shooting,passing:c.passing,dribbling:c.dribbling,defending:c.defending,physical:c.physical,fitness:c.fitness,morale:c.morale,changeReason:c.change_reason,isSignificant:c.is_significant_change})),n=["pace","shooting","passing","dribbling","defending","physical"],i={};n.forEach(c=>{const u=s.map(g=>g[c]).filter(g=>g!==void 0);if(u.length>=2){const g=u[0],p=u[u.length-1],m=p-g,v=m/g*100;i[c]={startValue:g,endValue:p,totalChange:m,changePercentage:v,trend:m>1?"improving":m<-1?"declining":"stable",averageValue:u.reduce((h,y)=>h+y,0)/u.length}}});const o=a.filter(c=>c.is_significant_change).map(c=>({date:c.record_date,reason:c.change_reason,changes:c.attribute_changes,overallImpact:Object.values(c.attribute_changes||{}).reduce((u,g)=>u+Math.abs(g),0)})),r=a[0],l=a[a.length-1],d=l.overall_rating-r.overall_rating;return{timeline:s,trends:i,significantChanges:o,totalImprovement:d,recordsAnalyzed:a.length,periodCovered:{start:r.record_date,end:l.record_date}}}analyzeMoraleEvolution(e,t){const a=t.filter(d=>d.entity_id===e).sort((d,c)=>new Date(d.updated_at)-new Date(c.updated_at));if(a.length===0)return{timeline:[],averageMorale:50,moraleStability:"unknown",impactFactors:{}};const s=a.map(d=>({date:d.updated_at,morale:d.current_morale,trend:d.morale_trend,lastEvent:d.last_significant_event,impactFactors:{results:d.recent_results_impact,training:d.training_impact,transfer:d.transfer_impact,injury:d.injury_impact,chemistry:d.team_chemistry_impact}})),n=s.map(d=>d.morale),i=n.reduce((d,c)=>d+c,0)/n.length,o=this.calculateVariance(n);let r;o<100?r="very_stable":o<300?r="stable":o<600?r="variable":r="very_variable";const l={results:this.calculateAverageImpact(s,"results"),training:this.calculateAverageImpact(s,"training"),transfer:this.calculateAverageImpact(s,"transfer"),injury:this.calculateAverageImpact(s,"injury"),chemistry:this.calculateAverageImpact(s,"chemistry")};return{timeline:s,averageMorale:Math.round(i),moraleStability:r,impactFactors:l,moraleVariance:Math.round(o),recordsAnalyzed:a.length}}calculateVariance(e){const t=e.reduce((s,n)=>s+n,0)/e.length;return e.map(s=>Math.pow(s-t,2)).reduce((s,n)=>s+n,0)/e.length}calculateAverageImpact(e,t){const a=e.map(s=>s.impactFactors[t]).filter(s=>s!==void 0&&s!==0);return a.length>0?a.reduce((s,n)=>s+n,0)/a.length:0}analyzeMatchPerformance(e,t,a){const s=[];if(a.forEach(h=>{var _;const y=(_=h.player_ratings)==null?void 0:_.find(b=>b.player_id===e);if(y){const b=t.find(S=>S.id===h.match_id);b&&s.push({matchId:b.id,date:b.match_date,homeTeam:b.home_team_id,awayTeam:b.away_team_id,result:`${b.home_goals}-${b.away_goals}`,rating:y.rating,position:y.position})}}),s.length===0)return{matchesPlayed:0,averageRating:0,performanceTrend:"no_data",bestPerformance:null,worstPerformance:null};s.sort((h,y)=>new Date(h.date)-new Date(y.date));const n=s.map(h=>h.rating),i=n.reduce((h,y)=>h+y,0)/n.length,o=s.reduce((h,y)=>y.rating>h.rating?y:h),r=s.reduce((h,y)=>y.rating<h.rating?y:h),l=s.slice(-5),d=s.slice(0,5),c=l.reduce((h,y)=>h+y.rating,0)/l.length,u=d.reduce((h,y)=>h+y.rating,0)/d.length;let g;const p=c-u;p>.3?g="improving":p<-.3?g="declining":g="stable";const m=this.calculateVariance(n);let v;return m<.5?v="very_consistent":m<1?v="consistent":m<2?v="variable":v="inconsistent",{matchesPlayed:s.length,averageRating:Math.round(i*10)/10,performanceTrend:g,consistency:v,bestPerformance:{rating:o.rating,date:o.date,result:o.result},worstPerformance:{rating:r.rating,date:r.date,result:r.result},timeline:s.map(h=>({date:h.date,rating:h.rating,result:h.result}))}}calculateOverallTrends(e){var a,s,n,i,o,r,l,d,c,u,g,p;const t={development:"stable",consistency:"average",potential:"unknown",riskFactors:[],strengths:[]};return((a=e.attributesEvolution)==null?void 0:a.totalImprovement)>3?t.development="excellent":((s=e.attributesEvolution)==null?void 0:s.totalImprovement)>1?t.development="good":((n=e.attributesEvolution)==null?void 0:n.totalImprovement)<-2&&(t.development="concerning"),((i=e.matchPerformance)==null?void 0:i.consistency)==="very_consistent"?t.consistency="excellent":((o=e.matchPerformance)==null?void 0:o.consistency)==="consistent"?t.consistency="good":((r=e.matchPerformance)==null?void 0:r.consistency)==="inconsistent"&&(t.consistency="poor"),((l=e.moraleEvolution)==null?void 0:l.averageMorale)<40&&t.riskFactors.push("low_morale"),((d=e.moraleEvolution)==null?void 0:d.moraleStability)==="very_variable"&&t.riskFactors.push("morale_instability"),((c=e.matchPerformance)==null?void 0:c.performanceTrend)==="declining"&&t.riskFactors.push("declining_performance"),((u=e.attributesEvolution)==null?void 0:u.totalImprovement)>2&&t.strengths.push("rapid_development"),((g=e.moraleEvolution)==null?void 0:g.averageMorale)>70&&t.strengths.push("high_morale"),((p=e.matchPerformance)==null?void 0:p.averageRating)>7.5&&t.strengths.push("excellent_performer"),t}identifyKeyMoments(e,t){const a=[],s=t.attributesHistory.filter(i=>i.player_id===e&&i.is_significant_change).map(i=>({date:i.record_date,type:"attribute_change",description:`Cambiamento significativo attributi: ${i.change_reason}`,impact:Object.values(i.attribute_changes||{}).reduce((o,r)=>o+Math.abs(r),0),details:i.attribute_changes}));a.push(...s);const n=t.moraleHistory.filter(i=>i.entity_id===e&&Math.abs(i.transfer_impact||0)>10).map(i=>({date:i.event_date,type:"morale_event",description:`Evento morale significativo: ${i.last_significant_event}`,impact:Math.abs(i.transfer_impact||0),details:{moraleChange:i.transfer_impact,newMorale:i.current_morale}}));return a.push(...n),a.sort((i,o)=>{const r=new Date(o.date)-new Date(i.date);return r!==0?r:o.impact-i.impact}),a.slice(0,10)}generateFutureProjections(e,t){var i,o,r,l,d;const a={nextSeason:{},longTerm:{},recommendations:[]};(i=e.attributesEvolution)!=null&&i.trends&&Object.keys(e.attributesEvolution.trends).forEach(c=>{const u=e.attributesEvolution.trends[c],g=u.endValue;let p=0;u.trend==="improving"?p=Math.max(1,u.totalChange*.5):u.trend==="declining"&&(p=Math.min(-1,u.totalChange*.3)),t.age>30?p*=.5:t.age<23&&(p*=1.2),a.nextSeason[c]=Math.max(1,Math.min(99,g+p))});const s=t.overall_rating;if(t.potential-s>0&&t.age<28){const c=((o=e.attributesEvolution)==null?void 0:o.totalImprovement)||0;a.nextSeason.overall_rating=Math.min(t.potential,s+Math.max(0,c*.7))}else a.nextSeason.overall_rating=s;return(r=e.overallTrends)!=null&&r.riskFactors.includes("low_morale")&&a.recommendations.push("Migliorare il morale del giocatore attraverso tempo di gioco e allenamenti mirati"),((l=e.overallTrends)==null?void 0:l.development)==="excellent"&&a.recommendations.push("Continuare il programma di allenamento attuale per mantenere lo sviluppo"),t.age>32&&((d=e.matchPerformance)==null?void 0:d.performanceTrend)==="declining"&&a.recommendations.push("Considerare la riduzione del carico di lavoro o la ricerca di un sostituto"),a}generateComparativeAnalysis(e,t){if(t.analysisType!=="comparison"||e.length<2)return null;const a={playersCompared:e.length,attributeComparison:{},performanceComparison:{},developmentComparison:{},rankings:{}};return["pace","shooting","passing","dribbling","defending","physical"].forEach(n=>{const i=e.map(o=>{var r,l,d,c,u,g;return{playerId:o.playerId,playerName:o.playerName,value:((d=(l=(r=o.attributesEvolution)==null?void 0:r.trends)==null?void 0:l[n])==null?void 0:d.endValue)||0,trend:((g=(u=(c=o.attributesEvolution)==null?void 0:c.trends)==null?void 0:u[n])==null?void 0:g.trend)||"stable"}}).filter(o=>o.value>0);i.length>0&&(i.sort((o,r)=>r.value-o.value),a.attributeComparison[n]=i)}),a.performanceComparison=e.map(n=>{var i,o,r;return{playerId:n.playerId,playerName:n.playerName,averageRating:((i=n.matchPerformance)==null?void 0:i.averageRating)||0,matchesPlayed:((o=n.matchPerformance)==null?void 0:o.matchesPlayed)||0,consistency:((r=n.matchPerformance)==null?void 0:r.consistency)||"unknown"}}).sort((n,i)=>i.averageRating-n.averageRating),a.developmentComparison=e.map(n=>{var i,o;return{playerId:n.playerId,playerName:n.playerName,totalImprovement:((i=n.attributesEvolution)==null?void 0:i.totalImprovement)||0,development:((o=n.overallTrends)==null?void 0:o.development)||"stable"}}).sort((n,i)=>i.totalImprovement-n.totalImprovement),a.rankings={bestPerformer:a.performanceComparison[0],mostImproved:a.developmentComparison[0],mostConsistent:e.reduce((n,i)=>{var r,l;const o=(r=i.matchPerformance)==null?void 0:r.consistency;return o==="very_consistent"||o==="consistent"&&((l=n.matchPerformance)==null?void 0:l.consistency)!=="very_consistent"?i:n},e[0])},a}calculateAggregateStatistics(e,t){const a={totalPlayersAnalyzed:e.length,averageImprovement:0,averagePerformance:0,developmentDistribution:{excellent:0,good:0,stable:0,concerning:0},moraleDistribution:{high:0,medium:0,low:0}},s=e.map(i=>{var o;return((o=i.attributesEvolution)==null?void 0:o.totalImprovement)||0}),n=e.map(i=>{var o;return((o=i.matchPerformance)==null?void 0:o.averageRating)||0}).filter(i=>i>0);return a.averageImprovement=s.reduce((i,o)=>i+o,0)/s.length,a.averagePerformance=n.length>0?n.reduce((i,o)=>i+o,0)/n.length:0,e.forEach(i=>{var r;const o=((r=i.overallTrends)==null?void 0:r.development)||"stable";a.developmentDistribution[o]++}),e.forEach(i=>{var r;const o=((r=i.moraleEvolution)==null?void 0:r.averageMorale)||50;o>=70?a.moraleDistribution.high++:o>=40?a.moraleDistribution.medium++:a.moraleDistribution.low++}),a}generateInsights(e,t){const a={keyFindings:[],recommendations:[],riskAlerts:[],opportunities:[]},s=e.filter(o=>{var r;return((r=o.overallTrends)==null?void 0:r.development)==="excellent"});s.length>0&&a.keyFindings.push(`${s.length} giocatore/i mostrano uno sviluppo eccellente`);const n=e.filter(o=>{var r;return((r=o.moraleEvolution)==null?void 0:r.averageMorale)<40});n.length>0&&a.riskAlerts.push(`${n.length} giocatore/i hanno morale basso che richiede attenzione`);const i=e.filter(o=>{var r;return((r=o.matchPerformance)==null?void 0:r.performanceTrend)==="declining"});return i.length>0&&a.riskAlerts.push(`${i.length} giocatore/i mostrano un calo nelle prestazioni`),e.forEach(o=>{var r,l;((r=o.overallTrends)==null?void 0:r.riskFactors.length)>0&&a.recommendations.push(`${o.playerName}: Affrontare ${o.overallTrends.riskFactors.join(", ")}`),(l=o.overallTrends)!=null&&l.strengths.includes("rapid_development")&&a.opportunities.push(`${o.playerName}: Potenziale di sviluppo rapido da sfruttare`)}),a}compileFinalReport(e){return{id:`history_report_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,type:"player_history_analysis",...e,summary:{playersAnalyzed:e.playerReports.length,periodAnalyzed:`${e.metadata.period.start} - ${e.metadata.period.end}`,dataTypes:e.metadata.dataTypes,keyInsights:e.insights.keyFindings.slice(0,3),mainRecommendations:e.insights.recommendations.slice(0,5)}}}async saveHistoryReport(e,t){this.gameManager.gameData.historyReports||(this.gameManager.gameData.historyReports=[]);const a={id:e.id,name:t||`Report ${new Date().toLocaleDateString("it-IT")}`,type:e.type,created_at:new Date().toISOString(),metadata:e.metadata,summary:e.summary,full_report_data:JSON.stringify(e)};return this.gameManager.gameData.historyReports.push(a),this.gameManager.saveGameData(),console.log(`💾 History report saved: ${a.name}`),a}countDataPoints(e){var t,a,s,n;return(((t=e.attributesHistory)==null?void 0:t.length)||0)+(((a=e.moraleHistory)==null?void 0:a.length)||0)+(((s=e.matchesHistory)==null?void 0:s.length)||0)+(((n=e.matchReports)==null?void 0:n.length)||0)}}class I{constructor(e){this.gameManager=e,this.defaultSettings=this.getDefaultSettings()}async execute(e){try{console.log("⚙️ Executing UserSettings_Apply flow...",e);const t=this.validateSettingsParams(e);if(!t.isValid)throw new Error(t.error);const a=e.action||"apply";let s;switch(a){case"apply":s=await this.applySettings(e);break;case"reset":s=await this.resetSettings(e);break;case"import":s=await this.importSettings(e);break;case"export":s=await this.exportSettings(e);break;default:throw new Error(`Azione non supportata: ${a}`)}return console.log("✅ UserSettings_Apply completed successfully"),{success:!0,action:a,result:s}}catch(t){return console.error("❌ UserSettings_Apply flow error:",t),{success:!1,error:t.message}}}validateSettingsParams(e){const t=["apply","reset","import","export"];return e.action&&!t.includes(e.action)?{isValid:!1,error:"Azione non valida"}:e.action==="apply"&&!e.settings?{isValid:!1,error:"Impostazioni mancanti per applicazione"}:e.action==="import"&&!e.importData?{isValid:!1,error:"Dati di importazione mancanti"}:{isValid:!0}}async applySettings(e){const t=e.userId||"default",a=e.settings,s=this.loadUserSettings(t),n=this.validateAndSanitizeSettings(a),i=this.mergeSettings(s,n);if(e.applyLive!==!1){const r=this.applyLiveChanges(s,i);r.success||console.warn("⚠️ Some live changes failed:",r.errors)}const o=this.saveUserSettings(t,i);return this.generateSettingsEvent(t,"settings_applied",{changedCategories:this.getChangedCategories(s,i),totalChanges:this.countChanges(s,i)}),{previousSettings:s,newSettings:i,changesApplied:this.getChangedCategories(s,i),liveChangesApplied:e.applyLive!==!1,saved:o.success}}async resetSettings(e){const t=e.userId||"default",a=this.loadUserSettings(t),s=this.getDefaultSettings();e.applyLive!==!1&&this.applyLiveChanges(a,s);const n=this.saveUserSettings(t,s);return this.generateSettingsEvent(t,"settings_reset",{resetToDefaults:!0}),{previousSettings:a,newSettings:s,resetToDefaults:!0,saved:n.success}}async importSettings(e){const t=e.userId||"default",a=e.importData,s=this.validateImportData(a);if(!s.isValid)throw new Error(`Dati importazione non validi: ${s.error}`);const n=this.extractSettingsFromImport(a),i=this.validateAndSanitizeSettings(n),o=this.loadUserSettings(t);e.applyLive!==!1&&this.applyLiveChanges(o,i);const r=this.saveUserSettings(t,i);return this.generateSettingsEvent(t,"settings_imported",{importSource:a.source||"unknown",importVersion:a.version||"unknown"}),{previousSettings:o,newSettings:i,importedFrom:a.source||"file",compatibilityVersion:a.version||"1.0",saved:r.success}}async exportSettings(e){var n,i,o;const t=e.userId||"default",a=this.loadUserSettings(t),s={version:"1.0",exportDate:new Date().toISOString(),source:"Bolt Manager 01/02",userId:t,settings:a,metadata:{gameVersion:((n=this.gameManager.gameData)==null?void 0:n.gameVersion)||"1.0.0",totalPlaytime:((o=(i=this.gameManager.gameData)==null?void 0:i.userSession)==null?void 0:o.totalPlaytime)||0,exportedBy:"UserSettings_Apply Flow"}};return this.generateSettingsEvent(t,"settings_exported",{exportFormat:"json",includesMetadata:!0}),{exportData:s,exportFormat:"json",exportSize:JSON.stringify(s).length,exportDate:s.exportDate}}loadUserSettings(e){if(!this.gameManager.gameData)return console.log("⚠️ GameData not available, returning default settings"),this.getDefaultSettings();this.gameManager.gameData.userSettings||(this.gameManager.gameData.userSettings=[]);const t=this.gameManager.gameData.userSettings.find(a=>a.user_id===e);if(t){const{id:a,user_id:s,created_at:n,updated_at:i,...o}=t;return o}return this.getDefaultSettings()}validateAndSanitizeSettings(e){const t={},a=this.getSettingsSchema();return Object.keys(a).forEach(s=>{e[s]?(t[s]={},Object.keys(a[s]).forEach(n=>{const i=a[s][n],o=e[s][n];o!==void 0?t[s][n]=this.validateSettingValue(o,i):t[s][n]=i.default})):t[s]=this.getDefaultSettings()[s]}),t}validateSettingValue(e,t){switch(t.type){case"string":return typeof e!="string"||t.options&&!t.options.includes(e)?t.default:t.maxLength&&e.length>t.maxLength?e.substring(0,t.maxLength):e;case"number":const a=Number(e);return isNaN(a)?t.default:t.min!==void 0&&a<t.min?t.min:t.max!==void 0&&a>t.max?t.max:a;case"boolean":return!!e;case"array":return Array.isArray(e)?t.maxItems&&e.length>t.maxItems?e.slice(0,t.maxItems):e.filter(s=>t.itemType?typeof s===t.itemType:!0):t.default;case"object":return typeof e!="object"||e===null?t.default:e;default:return t.default}}mergeSettings(e,t){const a={...e};return Object.keys(t).forEach(s=>{a[s]||(a[s]={}),Object.keys(t[s]).forEach(n=>{a[s][n]=t[s][n]})}),a}applyLiveChanges(e,t){var s,n,i,o,r,l,d,c;const a={success:!0,applied:[],errors:[]};try{this.hasChanged((s=e.appearance)==null?void 0:s.theme,(n=t.appearance)==null?void 0:n.theme)&&(this.applyThemeChange(t.appearance.theme),a.applied.push("theme")),this.hasChanged((i=e.localization)==null?void 0:i.language,(o=t.localization)==null?void 0:o.language)&&(this.applyLanguageChange(t.localization.language),a.applied.push("language")),(this.hasChanged((r=e.audio)==null?void 0:r.sound_enabled,(l=t.audio)==null?void 0:l.sound_enabled)||this.hasChanged((d=e.audio)==null?void 0:d.sound_volume,(c=t.audio)==null?void 0:c.sound_volume))&&(this.applyAudioChanges(t.audio),a.applied.push("audio")),this.hasSettingsCategoryChanged(e.accessibility,t.accessibility)&&(this.applyAccessibilityChanges(t.accessibility),a.applied.push("accessibility")),this.hasSettingsCategoryChanged(e.interface,t.interface)&&(this.applyInterfaceChanges(t.interface),a.applied.push("interface"))}catch(u){a.success=!1,a.errors.push(u.message)}return a}hasChanged(e,t){return e!==t}hasSettingsCategoryChanged(e,t){return!e&&!t?!1:!e||!t?!0:JSON.stringify(e)!==JSON.stringify(t)}applyThemeChange(e){const t=document.body;switch(t.classList.remove("theme-light","theme-dark","theme-auto"),e){case"dark":t.classList.add("theme-dark");break;case"auto":t.classList.add("theme-auto"),window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?t.classList.add("theme-dark"):t.classList.add("theme-light");break;default:t.classList.add("theme-light")}console.log(`🎨 Theme applied: ${e}`)}applyLanguageChange(e){document.documentElement.lang=e,localStorage.setItem("boltManager_language",e),console.log(`🌐 Language applied: ${e}`)}applyAudioChanges(e){typeof e.sound_enabled=="boolean"&&(document.body.dataset.soundEnabled=e.sound_enabled),typeof e.sound_volume=="number"&&(document.body.dataset.soundVolume=e.sound_volume),typeof e.music_enabled=="boolean"&&(document.body.dataset.musicEnabled=e.music_enabled),typeof e.music_volume=="number"&&(document.body.dataset.musicVolume=e.music_volume),console.log("🔊 Audio settings applied:",e)}applyAccessibilityChanges(e){const t=document.body;e.reduce_motion?t.classList.add("reduce-motion"):t.classList.remove("reduce-motion"),e.high_contrast?t.classList.add("high-contrast"):t.classList.remove("high-contrast"),e.large_text?t.classList.add("large-text"):t.classList.remove("large-text"),e.enhanced_focus?t.classList.add("enhanced-focus"):t.classList.remove("enhanced-focus"),console.log("♿ Accessibility settings applied:",e)}applyInterfaceChanges(e){const t=document.body;t.classList.remove("ui-compact","ui-normal","ui-spacious"),e.ui_density&&t.classList.add(`ui-${e.ui_density}`),t.dataset.showTooltips=e.show_tooltips,t.dataset.showAnimations=e.show_animations,console.log("🖥️ Interface settings applied:",e)}saveUserSettings(e,t){try{if(!this.gameManager.gameData)return console.warn("⚠️ GameData not available, cannot save settings to dataset"),localStorage.setItem(`boltManager_userSettings_${e}`,JSON.stringify(t)),{success:!0,fallback:!0};this.gameManager.gameData.userSettings||(this.gameManager.gameData.userSettings=[]);let a=this.gameManager.gameData.userSettings.findIndex(n=>n.user_id===e);const s={id:a>=0?this.gameManager.gameData.userSettings[a].id:`settings_${e}_${Date.now()}`,user_id:e,...t,updated_at:new Date().toISOString()};return a>=0?(s.created_at=this.gameManager.gameData.userSettings[a].created_at,this.gameManager.gameData.userSettings[a]=s):(s.created_at=new Date().toISOString(),this.gameManager.gameData.userSettings.push(s)),this.gameManager.saveGameData(),localStorage.setItem(`boltManager_userSettings_${e}`,JSON.stringify(t)),console.log(`💾 User settings saved for user: ${e}`),{success:!0}}catch(a){return console.error("Error saving user settings:",a),{success:!1,error:a.message}}}validateImportData(e){return!e||typeof e!="object"?{isValid:!1,error:"Dati non validi"}:e.version?e.settings?["1.0"].includes(e.version)?{isValid:!0}:{isValid:!1,error:`Versione non supportata: ${e.version}`}:{isValid:!1,error:"Impostazioni mancanti"}:{isValid:!1,error:"Versione mancante"}}extractSettingsFromImport(e){return e.settings}getChangedCategories(e,t){const a=[];return Object.keys(t).forEach(s=>{this.hasSettingsCategoryChanged(e[s],t[s])&&a.push(s)}),a}countChanges(e,t){let a=0;return Object.keys(t).forEach(s=>{e[s]&&t[s]&&Object.keys(t[s]).forEach(n=>{e[s][n]!==t[s][n]&&a++})}),a}generateSettingsEvent(e,t,a){if(!this.gameManager.gameData){console.warn("⚠️ GameData not available, cannot generate settings event");return}this.gameManager.gameData.gameEvents||(this.gameManager.gameData.gameEvents=[]);const s={id:`event_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,event_type:"settings",event_category:"info",title:this.getEventTitle(t),description:this.getEventDescription(t,a),related_entity_type:"user_settings",related_entity_id:e,team_id:null,player_id:null,match_id:null,priority:1,is_read:!1,is_user_relevant:!0,auto_generated:!0,expires_at:null,action_required:!1,action_type:null,action_data:null,event_date:new Date().toISOString(),game_date:this.gameManager.getCurrentDate(),created_at:new Date().toISOString()};this.gameManager.gameData.gameEvents.push(s)}getEventTitle(e){return{settings_applied:"Impostazioni Applicate",settings_reset:"Impostazioni Ripristinate",settings_imported:"Impostazioni Importate",settings_exported:"Impostazioni Esportate"}[e]||"Impostazioni Aggiornate"}getEventDescription(e,t){switch(e){case"settings_applied":return`Applicate modifiche a: ${t.changedCategories.join(", ")}. Totale cambiamenti: ${t.totalChanges}`;case"settings_reset":return"Tutte le impostazioni sono state ripristinate ai valori predefiniti";case"settings_imported":return`Impostazioni importate da ${t.importSource} (versione ${t.importVersion})`;case"settings_exported":return`Impostazioni esportate in formato ${t.exportFormat}`;default:return"Impostazioni utente modificate"}}getDefaultSettings(){return{appearance:{theme:"light",color_scheme:"default",background_style:"default"},localization:{language:"it",currency:"EUR",date_format:"DD/MM/YYYY",time_format:"24h",number_format:"european"},audio:{sound_enabled:!0,sound_volume:50,music_enabled:!1,music_volume:30,ui_sounds:!0,match_sounds:!0,notification_sounds:!0},notifications:{enabled:!0,match_events:!0,transfer_updates:!0,training_results:!0,injury_alerts:!0,contract_expiry:!0,achievement_unlocked:!0,system_messages:!0},interface:{ui_density:"normal",show_tooltips:!0,show_animations:!0,auto_save_frequency:5,confirm_actions:!0,quick_navigation:!0,sidebar_collapsed:!1},gameplay:{match_speed:"normal",match_detail_level:"medium",auto_continue:!1,pause_on_events:!0,simulation_speed:"normal",difficulty_level:"normal"},accessibility:{reduce_motion:!1,high_contrast:!1,large_text:!1,enhanced_focus:!1,screen_reader_support:!1,keyboard_navigation:!0,color_blind_support:!1},privacy:{analytics_enabled:!0,crash_reporting:!0,usage_statistics:!0,data_sharing:!1,backup_enabled:!0,cloud_sync:!1},advanced:{performance_mode:!1,debug_mode:!1,experimental_features:!1,beta_updates:!1,developer_tools:!1}}}getSettingsSchema(){return{appearance:{theme:{type:"string",options:["light","dark","auto"],default:"light"},color_scheme:{type:"string",options:["default","blue","green","red"],default:"default"},background_style:{type:"string",options:["default","minimal","rich"],default:"default"}},localization:{language:{type:"string",options:["it","en","es","fr","de"],default:"it"},currency:{type:"string",options:["EUR","USD","GBP"],default:"EUR"},date_format:{type:"string",options:["DD/MM/YYYY","MM/DD/YYYY","YYYY-MM-DD"],default:"DD/MM/YYYY"},time_format:{type:"string",options:["12h","24h"],default:"24h"},number_format:{type:"string",options:["european","american"],default:"european"}},audio:{sound_enabled:{type:"boolean",default:!0},sound_volume:{type:"number",min:0,max:100,default:50},music_enabled:{type:"boolean",default:!1},music_volume:{type:"number",min:0,max:100,default:30},ui_sounds:{type:"boolean",default:!0},match_sounds:{type:"boolean",default:!0},notification_sounds:{type:"boolean",default:!0}},notifications:{enabled:{type:"boolean",default:!0},match_events:{type:"boolean",default:!0},transfer_updates:{type:"boolean",default:!0},training_results:{type:"boolean",default:!0},injury_alerts:{type:"boolean",default:!0},contract_expiry:{type:"boolean",default:!0},achievement_unlocked:{type:"boolean",default:!0},system_messages:{type:"boolean",default:!0}},interface:{ui_density:{type:"string",options:["compact","normal","spacious"],default:"normal"},show_tooltips:{type:"boolean",default:!0},show_animations:{type:"boolean",default:!0},auto_save_frequency:{type:"number",min:1,max:60,default:5},confirm_actions:{type:"boolean",default:!0},quick_navigation:{type:"boolean",default:!0},sidebar_collapsed:{type:"boolean",default:!1}},gameplay:{match_speed:{type:"string",options:["slow","normal","fast"],default:"normal"},match_detail_level:{type:"string",options:["low","medium","high"],default:"medium"},auto_continue:{type:"boolean",default:!1},pause_on_events:{type:"boolean",default:!0},simulation_speed:{type:"string",options:["slow","normal","fast"],default:"normal"},difficulty_level:{type:"string",options:["easy","normal","hard"],default:"normal"}},accessibility:{reduce_motion:{type:"boolean",default:!1},high_contrast:{type:"boolean",default:!1},large_text:{type:"boolean",default:!1},enhanced_focus:{type:"boolean",default:!1},screen_reader_support:{type:"boolean",default:!1},keyboard_navigation:{type:"boolean",default:!0},color_blind_support:{type:"boolean",default:!1}},privacy:{analytics_enabled:{type:"boolean",default:!0},crash_reporting:{type:"boolean",default:!0},usage_statistics:{type:"boolean",default:!0},data_sharing:{type:"boolean",default:!1},backup_enabled:{type:"boolean",default:!0},cloud_sync:{type:"boolean",default:!1}},advanced:{performance_mode:{type:"boolean",default:!1},debug_mode:{type:"boolean",default:!1},experimental_features:{type:"boolean",default:!1},beta_updates:{type:"boolean",default:!1},developer_tools:{type:"boolean",default:!1}}}}}class C{constructor(){this.dataManager=new M,this.gameData=null,this.transferOfferFlow=new D(this),this.transferProcessFlow=new $(this),this.staffAssignRoleFlow=new E(this),this.reportCompileHistoryFlow=new T(this),this.userSettingsApplyFlow=new I(this)}async init(){console.log("🎮 GameManager initializing..."),await this.dataManager.init(),this.gameData=this.dataManager.getGameData(),this.gameData||console.log("No existing game data found"),await this.loadUserSettings()}async loadUserSettings(){try{const e=await this.userSettingsApplyFlow.execute({action:"apply",settings:this.userSettingsApplyFlow.loadUserSettings("default"),applyLive:!0});e.success?console.log("✅ User settings loaded and applied"):console.warn("⚠️ Failed to load user settings:",e.error)}catch(e){console.error("Error loading user settings:",e)}}async startNewGame(){console.log("🎯 Starting new game...");try{return this.gameData=this.generateInitialGameData(),this.saveGameData(),console.log("✅ New game created successfully"),this.gameData}catch(e){throw console.error("Error starting new game:",e),e}}generateInitialGameData(){const e=new Date;return{gameVersion:"1.0.0",createdAt:e.toISOString(),currentDate:e.toISOString(),currentSeason:1,currentMatchday:1,teams:this.generateTeams(),players:[],staff:[],matches:[],trainings:[],transfers:[],tactics:[],gameEvents:[],matchReports:[],attributesHistory:[],moraleStatus:[],historyReports:[],userSettings:[],userSession:{sessionName:"Nuova Carriera",userTeamId:null,totalPlaytime:0,achievements:[],settings:{}}}}generateTeams(){const t=[{name:"AC Milano",city:"Milano",short:"MIL"},{name:"Inter Milano",city:"Milano",short:"INT"},{name:"Juventus FC",city:"Torino",short:"JUV"},{name:"AS Roma",city:"Roma",short:"ROM"},{name:"SSC Napoli",city:"Napoli",short:"NAP"},{name:"ACF Fiorentina",city:"Firenze",short:"FIO"},{name:"Atalanta BC",city:"Bergamo",short:"ATA"},{name:"SS Lazio",city:"Roma",short:"LAZ"},{name:"Torino FC",city:"Torino",short:"TOR"},{name:"UC Sampdoria",city:"Genova",short:"SAM"},{name:"Genoa CFC",city:"Genova",short:"GEN"},{name:"Bologna FC",city:"Bologna",short:"BOL"},{name:"Udinese Calcio",city:"Udine",short:"UDI"},{name:"Parma Calcio",city:"Parma",short:"PAR"},{name:"Cagliari Calcio",city:"Cagliari",short:"CAG"},{name:"Hellas Verona",city:"Verona",short:"VER"},{name:"US Sassuolo",city:"Sassuolo",short:"SAS"},{name:"Spezia Calcio",city:"La Spezia",short:"SPE"},{name:"Benevento Calcio",city:"Benevento",short:"BEN"},{name:"Crotone FC",city:"Crotone",short:"CRO"}].map((a,s)=>{var r,l;const n={id:`team_${s+1}`,name:a.name,short_name:a.short,city:a.city,league_position:null,points:0,matches_played:0,wins:0,draws:0,losses:0,goals_for:0,goals_against:0,budget:1e6+Math.random()*5e6,is_user_team:s===0,formation:"4-4-2",team_morale:50+Math.random()*30,created_at:new Date().toISOString(),updated_at:new Date().toISOString()},i=this.generatePlayersForTeam(n.id);(r=this.gameData)!=null&&r.players?this.gameData.players.push(...i):this.gameData={players:i};const o=this.generateStaffForTeam(n.id);return(l=this.gameData)!=null&&l.staff?this.gameData.staff.push(...o):this.gameData={...this.gameData,staff:o},n});return t.length>0&&(this.gameData.userSession.userTeamId=t[0].id),t}generatePlayersForTeam(e){const t=[{pos:"GK",count:2},{pos:"DEF",count:8},{pos:"MID",count:8},{pos:"ATT",count:6}],a=["Marco","Luca","Andrea","Francesco","Alessandro","Matteo","Lorenzo","Davide","Simone","Federico","Gabriele","Riccardo","Stefano","Antonio","Giuseppe"],s=["Rossi","Bianchi","Ferrari","Russo","Romano","Gallo","Costa","Fontana","Ricci","Marino","Greco","Bruno","Galli","Conti","De Luca"],n=[];let i=0;return t.forEach(o=>{for(let r=0;r<o.count;r++){const l=18+Math.floor(Math.random()*17),d=45+Math.floor(Math.random()*40),c=Math.min(99,d+Math.floor(Math.random()*20)),u={id:`player_${e}_${i++}`,team_id:e,first_name:a[Math.floor(Math.random()*a.length)],last_name:s[Math.floor(Math.random()*s.length)],age:l,position:o.pos,secondary_position:Math.random()<.3?this.getRandomSecondaryPosition(o.pos):null,overall_rating:d,potential:c,pace:this.generateAttributeValue(d,o.pos,"pace"),shooting:this.generateAttributeValue(d,o.pos,"shooting"),passing:this.generateAttributeValue(d,o.pos,"passing"),dribbling:this.generateAttributeValue(d,o.pos,"dribbling"),defending:this.generateAttributeValue(d,o.pos,"defending"),physical:this.generateAttributeValue(d,o.pos,"physical"),stamina:80+Math.floor(Math.random()*20),fitness:85+Math.floor(Math.random()*15),morale:40+Math.floor(Math.random()*40),injury_status:"healthy",injury_days:0,market_value:this.calculateMarketValue(d,l,c),salary:this.calculateSalary(d,l),contract_expires:new Date(Date.now()+(1+Math.random()*4)*365*24*60*60*1e3).toISOString(),goals_scored:0,assists:0,yellow_cards:0,red_cards:0,matches_played:0,is_captain:r===0&&o.pos==="DEF",created_at:new Date().toISOString(),updated_at:new Date().toISOString()};n.push(u)}}),n}generateStaffForTeam(e){const t=[{role:"head_coach",count:1},{role:"assistant_coach",count:2},{role:"fitness_coach",count:1},{role:"scout",count:2},{role:"physio",count:1}],a=["Roberto","Massimo","Claudio","Fabio","Gianluca","Paolo","Maurizio","Vincenzo","Gianluigi","Daniele"],s=["Mancini","Allegri","Ancelotti","Conte","Spalletti","Sarri","Pioli","Gasperini","Inzaghi","Mourinho"],n=[];let i=0;return t.forEach(o=>{for(let r=0;r<o.count;r++){const l=1+Math.floor(Math.random()*15),d=40+Math.floor(Math.random()*40),c={id:`staff_${e}_${i++}`,team_id:e,first_name:a[Math.floor(Math.random()*a.length)],last_name:s[Math.floor(Math.random()*s.length)],age:30+Math.floor(Math.random()*25),role:o.role,experience_years:l,coaching_ability:o.role.includes("coach")?d+Math.floor(Math.random()*20):null,tactical_knowledge:o.role.includes("coach")?d+Math.floor(Math.random()*20):null,motivational_skills:d+Math.floor(Math.random()*15),fitness_expertise:o.role==="fitness_coach"?d+20:null,scouting_ability:o.role==="scout"?d+15:null,medical_expertise:o.role==="physio"?d+15:null,specialization:null,preferred_formation:o.role==="head_coach"?"4-4-2":null,preferred_style:o.role==="head_coach"?"balanced":null,salary:this.calculateStaffSalary(o.role,l),contract_expires:new Date(Date.now()+(2+Math.random()*3)*365*24*60*60*1e3).toISOString(),reputation:d,morale:50+Math.floor(Math.random()*30),loyalty:50+Math.floor(Math.random()*30),is_head_of_department:r===0,languages:["Italiano"],achievements:[],injury_proneness_reduction:o.role==="physio"?5+Math.floor(Math.random()*10):null,training_efficiency_bonus:o.role.includes("coach")?2+Math.floor(Math.random()*8):null,created_at:new Date().toISOString(),updated_at:new Date().toISOString()};n.push(c)}}),n}generateAttributeValue(e,t,a){let s=0;switch(t){case"GK":a==="defending"&&(s=10),a==="shooting"&&(s=-20),a==="dribbling"&&(s=-10);break;case"DEF":a==="defending"&&(s=15),a==="physical"&&(s=10),a==="shooting"&&(s=-15);break;case"MID":a==="passing"&&(s=10),a==="dribbling"&&(s=5);break;case"ATT":a==="shooting"&&(s=15),a==="pace"&&(s=10),a==="defending"&&(s=-15);break}const n=e+s+(Math.random()*20-10);return Math.max(1,Math.min(99,Math.round(n)))}getRandomSecondaryPosition(e){const a={GK:[],DEF:["MID"],MID:["DEF","ATT"],ATT:["MID"]}[e]||[];return a.length>0?a[Math.floor(Math.random()*a.length)]:null}calculateMarketValue(e,t,a){let s=e*5e4;t<=20?s*=1.5:t<=25?s*=1.3:t<=28?s*=1.2:t<=32?s*=1:s*=.7;const n=a-e;return s+=n*25e3,Math.round(s)}calculateSalary(e,t){let a=e*500;return t>=30?a*=1.2:t<=22&&(a*=.8),Math.round(a)}calculateStaffSalary(e,t){const s={head_coach:8e3,assistant_coach:3e3,fitness_coach:2e3,scout:1500,physio:1800}[e]||1e3,n=t*200;return s+n}getUserTeam(){return!this.gameData||!this.gameData.teams?null:this.gameData.teams.find(e=>e.is_user_team)}getUserPlayers(){const e=this.getUserTeam();return!e||!this.gameData.players?[]:this.gameData.players.filter(t=>t.team_id===e.id)}getPlayersByTeam(e){return this.gameData.players?this.gameData.players.filter(t=>t.team_id===e):[]}getCurrentDate(){var e;return((e=this.gameData)==null?void 0:e.currentDate)||new Date().toISOString()}async executePlayerTrain(e){console.log("🏃 Executing player training...");const t=e.playerIds.map(s=>{const n=this.gameData.players.find(c=>c.id===s);if(!n)return null;const i={},o=.3;({fitness:["physical","pace"],technical:["shooting","passing","dribbling"],tactical:["passing","defending"]}[e.trainingType]||["physical"]).forEach(c=>{if(Math.random()<o){const u=Math.floor(Math.random()*e.intensity)+1;i[c]=u,n[c]=Math.min(99,n[c]+u)}}),n.fitness=Math.min(100,n.fitness+e.intensity*2),n.morale=Math.min(100,n.morale+1),n.updated_at=new Date().toISOString();let d=null;return Math.random()<.02*e.intensity&&(d={type:"minor",description:"Affaticamento muscolare",days:Math.floor(Math.random()*3)+1},n.injury_status="minor",n.injury_days=d.days),{playerId:s,attributeChanges:i,injury:d}}).filter(s=>s!==null),a={id:`training_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,team_id:e.teamId,training_date:new Date().toISOString(),training_type:e.trainingType,intensity:e.intensity,focus_area:e.trainingType,duration_minutes:90,participants:e.playerIds,individual_programs:[],staff_id:null,weather_conditions:"normal",facility_quality:70,injury_risk:e.intensity*2,morale_impact:2,fitness_gain:e.intensity*2,skill_improvements:t.filter(s=>Object.keys(s.attributeChanges).length>0),injuries_occurred:t.filter(s=>s.injury).map(s=>s.injury),status:"completed",notes:`Allenamento ${e.trainingType} completato con intensità ${e.intensity}`,created_at:new Date().toISOString(),updated_at:new Date().toISOString()};return this.gameData.trainings||(this.gameData.trainings=[]),this.gameData.trainings.push(a),this.saveGameData(),{trainingRecord:a,results:t}}async executeAdvanceDay(e=1){console.log(`📅 Advancing ${e} day(s)...`);const t=new Date(this.getCurrentDate()),a=new Date(t);a.setDate(t.getDate()+e),this.gameData.currentDate=a.toISOString();const s=[];return this.gameData.players&&this.gameData.players.forEach(n=>{n.injury_days>0&&(n.injury_days=Math.max(0,n.injury_days-e),n.injury_days===0&&(n.injury_status="healthy",s.push({type:"recovery",title:`${n.first_name} ${n.last_name} è guarito`,description:"Il giocatore è tornato disponibile",priority:2}))),n.fitness<100&&(n.fitness=Math.min(100,n.fitness+e*2))}),this.saveGameData(),{newDate:a.toISOString(),eventsGenerated:s}}async simulateMatch(e){var u;console.log(`⚽ Simulating match: ${e}`);const t=(u=this.gameData.matches)==null?void 0:u.find(g=>g.id===e);if(!t)throw new Error("Match not found");const a=this.gameData.teams.find(g=>g.id===t.home_team_id),s=this.gameData.teams.find(g=>g.id===t.away_team_id),n=this.getPlayersByTeam(t.home_team_id),i=this.getPlayersByTeam(t.away_team_id),o=this.calculateTeamStrength(n,a),r=this.calculateTeamStrength(i,s),l=[];let d=0,c=0;for(let g=1;g<=90;g++)if(Math.random()<.05){const p=this.getRandomEventType(),m=Math.random()<o/(o+r);if(p==="goal")if(m){d++;const v=n[Math.floor(Math.random()*n.length)];l.push({minute:g,type:"goal",team:"home",player:v.id,description:`⚽ Gol di ${v.first_name} ${v.last_name}!`}),v.goals_scored++}else{c++;const v=i[Math.floor(Math.random()*i.length)];l.push({minute:g,type:"goal",team:"away",player:v.id,description:`⚽ Gol di ${v.first_name} ${v.last_name}!`}),v.goals_scored++}}return t.home_goals=d,t.away_goals=c,t.status="finished",t.updated_at=new Date().toISOString(),a.matches_played++,s.matches_played++,a.goals_for+=d,a.goals_against+=c,s.goals_for+=c,s.goals_against+=d,d>c?(a.wins++,a.points+=3,s.losses++):c>d?(s.wins++,s.points+=3,a.losses++):(a.draws++,s.draws++,a.points++,s.points++),this.generateMatchReport(t,l,n,i),this.saveGameData(),{match:t,events:l,stats:{home_possession:45+Math.random()*20,away_possession:45+Math.random()*20,home_shots:Math.floor(Math.random()*15)+5,away_shots:Math.floor(Math.random()*15)+5,home_shots_on_target:Math.floor(Math.random()*8)+2,away_shots_on_target:Math.floor(Math.random()*8)+2,home_corners:Math.floor(Math.random()*10),away_corners:Math.floor(Math.random()*10),home_fouls:Math.floor(Math.random()*15)+5,away_fouls:Math.floor(Math.random()*15)+5}}}calculateTeamStrength(e,t){const a=e.reduce((n,i)=>n+i.overall_rating,0)/e.length,s=(t.team_morale-50)/10;return a+s}getRandomEventType(){const e=["goal","shot","corner","foul"],t=[.1,.4,.3,.2],a=Math.random();let s=0;for(let n=0;n<e.length;n++)if(s+=t[n],a<=s)return e[n];return"shot"}generateMatchReport(e,t,a,s){const n=`report_${e.id}_${Date.now()}`,i=[];[...a,...s].forEach(r=>{const l=5.5+Math.random()*3,d=r.goals_scored*.5,c=Math.min(10,Math.max(1,l+d));i.push({player_id:r.id,player_name:`${r.first_name} ${r.last_name}`,position:r.position,rating:Math.round(c*10)/10})});const o={id:n,match_id:e.id,match_events:t,home_possession:45+Math.random()*20,away_possession:45+Math.random()*20,home_shots:Math.floor(Math.random()*15)+5,away_shots:Math.floor(Math.random()*15)+5,home_shots_on_target:Math.floor(Math.random()*8)+2,away_shots_on_target:Math.floor(Math.random()*8)+2,home_corners:Math.floor(Math.random()*10),away_corners:Math.floor(Math.random()*10),home_fouls:Math.floor(Math.random()*15)+5,away_fouls:Math.floor(Math.random()*15)+5,home_yellow_cards:Math.floor(Math.random()*4),away_yellow_cards:Math.floor(Math.random()*4),home_red_cards:Math.random()<.1?1:0,away_red_cards:Math.random()<.1?1:0,home_passes:Math.floor(Math.random()*200)+300,away_passes:Math.floor(Math.random()*200)+300,home_pass_accuracy:70+Math.random()*25,away_pass_accuracy:70+Math.random()*25,player_ratings:i,man_of_the_match:i.reduce((r,l)=>l.rating>r.rating?l:r).player_id,key_moments:t.filter(r=>r.type==="goal"),tactical_analysis:"Partita equilibrata con buone occasioni da entrambe le parti.",weather_impact:null,referee_performance:6+Math.random()*3,attendance_impact:null,injury_time_home:Math.floor(Math.random()*4),injury_time_away:Math.floor(Math.random()*4),created_at:new Date().toISOString()};return this.gameData.matchReports||(this.gameData.matchReports=[]),this.gameData.matchReports.push(o),o}updateTactics(e){console.log("⚙️ Updating tactics...");const a={id:`tactic_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,team_id:e.teamId,tactic_name:e.tacticName||"Tattica Principale",formation:e.formation,mentality:e.mentality,tempo:e.tempo,width:e.width,pressing:e.pressing,defensive_line:e.defensiveLine,passing_style:e.passingStyle,crossing:e.crossing,player_positions:e.playerPositions,player_roles:e.playerRoles,set_pieces:e.setPieces||[],captain_id:e.captainId,penalty_taker_id:e.penaltyTakerId,free_kick_taker_id:e.freeKickTakerId,corner_taker_id:e.cornerTakerId,is_default:!0,effectiveness_rating:this.calculateTacticalEffectiveness(e),matches_used:0,created_at:new Date().toISOString(),updated_at:new Date().toISOString()};this.gameData.tactics||(this.gameData.tactics=[]),this.gameData.tactics=this.gameData.tactics.filter(n=>!(n.team_id===e.teamId&&n.is_default)),this.gameData.tactics.push(a);const s=this.gameData.teams.find(n=>n.id===e.teamId);return s&&(s.formation=e.formation,s.updated_at=new Date().toISOString()),this.saveGameData(),a}calculateTacticalEffectiveness(e){let t=70;return t+=5,e.playerPositions&&e.playerPositions.length>=11&&(t+=10),Math.min(100,t)}getTeamTactics(e){return this.gameData.tactics?this.gameData.tactics.find(t=>t.team_id===e&&t.is_default):null}getUpcomingMatches(e,t=5){if(!this.gameData.matches)return[];const a=new Date(this.getCurrentDate());return this.gameData.matches.filter(s=>(s.home_team_id===e||s.away_team_id===e)&&new Date(s.match_date)>a&&s.status==="scheduled").sort((s,n)=>new Date(s.match_date)-new Date(n.match_date)).slice(0,t)}getRecentMatches(e,t=5){return this.gameData.matches?this.gameData.matches.filter(a=>(a.home_team_id===e||a.away_team_id===e)&&a.status==="finished").sort((a,s)=>new Date(s.match_date)-new Date(a.match_date)).slice(0,t):[]}getMatchReport(e){return this.gameData.matchReports?this.gameData.matchReports.find(t=>t.match_id===e):null}getUpcomingEvents(e=7){const t=[],a=new Date(this.getCurrentDate()),s=new Date(a);return s.setDate(a.getDate()+e),this.gameData.matches&&this.gameData.matches.filter(i=>{const o=new Date(i.match_date);return o>=a&&o<=s&&i.is_user_match}).forEach(i=>{const o=this.gameData.teams.find(l=>l.id===i.home_team_id),r=this.gameData.teams.find(l=>l.id===i.away_team_id);t.push({type:"match",date:i.match_date,title:`${(o==null?void 0:o.short_name)||"HOME"} vs ${(r==null?void 0:r.short_name)||"AWAY"}`,description:`Giornata ${i.matchday}`,priority:4})}),this.gameData.trainings&&this.gameData.trainings.filter(i=>{const o=new Date(i.training_date);return o>=a&&o<=s&&i.status==="scheduled"}).forEach(i=>{t.push({type:"training",date:i.training_date,title:`Allenamento ${i.training_type}`,description:`Intensità ${i.intensity}`,priority:2})}),t.sort((n,i)=>new Date(n.date)-new Date(i.date))}scheduleTraining(e){const a={id:`training_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,team_id:e.teamId,training_date:e.date,training_type:e.type,intensity:e.intensity,focus_area:e.type,duration_minutes:90,participants:e.playerIds,individual_programs:[],staff_id:null,weather_conditions:null,facility_quality:70,injury_risk:e.intensity*2,morale_impact:null,fitness_gain:null,skill_improvements:[],injuries_occurred:[],status:"scheduled",notes:`Allenamento ${e.type} programmato`,created_at:new Date().toISOString(),updated_at:new Date().toISOString()};return this.gameData.trainings||(this.gameData.trainings=[]),this.gameData.trainings.push(a),this.saveGameData(),a}async executeTransferOffer(e){return await this.transferOfferFlow.execute(e)}async executeTransferProcess(e){return await this.transferProcessFlow.execute(e)}async executeStaffAssignRole(e){return await this.staffAssignRoleFlow.execute(e)}async executeReportCompileHistory(e){return await this.reportCompileHistoryFlow.execute(e)}getPlayerAttributesHistory(e,t,a){return this.gameData.attributesHistory?this.gameData.attributesHistory.filter(s=>{const n=new Date(s.record_date);return s.player_id===e&&n>=new Date(t)&&n<=new Date(a)}):[]}getPlayerMatchHistory(e,t,a){if(!this.gameData.matchReports)return[];const s=[];return this.gameData.matchReports.forEach(n=>{var o,r;const i=(o=n.player_ratings)==null?void 0:o.find(l=>l.player_id===e);if(i){const l=(r=this.gameData.matches)==null?void 0:r.find(d=>d.id===n.match_id);if(l){const d=new Date(l.match_date);d>=new Date(t)&&d<=new Date(a)&&s.push({matchId:l.id,date:l.match_date,rating:i.rating,homeTeam:l.home_team_id,awayTeam:l.away_team_id,result:`${l.home_goals}-${l.away_goals}`})}}}),s}getSavedHistoryReports(){return this.gameData.historyReports||[]}getHistoryReport(e){const t=this.getSavedHistoryReports().find(a=>a.id===e);if(t&&t.full_report_data)try{return JSON.parse(t.full_report_data)}catch(a){return console.error("Error parsing saved report:",a),null}return null}getPlayerMorale(e){return this.gameData.moraleStatus?this.gameData.moraleStatus.find(t=>t.entity_id===e&&t.entity_type==="player"):null}async executeUserSettingsApply(e){return await this.userSettingsApplyFlow.execute(e)}getUserSettings(e="default"){return this.userSettingsApplyFlow.loadUserSettings(e)}async saveSession(e){var n,i;console.log("💾 Saving session...");const t=`session_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,a=this.getUserTeam(),s={id:t,session_name:e||`Sessione ${new Date().toLocaleDateString("it-IT")}`,user_team_id:a==null?void 0:a.id,user_team_name:a==null?void 0:a.name,current_season:this.gameData.currentSeason,current_matchday:this.gameData.currentMatchday,current_date:this.gameData.currentDate,total_budget:(a==null?void 0:a.budget)||0,achievements:((n=this.gameData.userSession)==null?void 0:n.achievements)||[],difficulty_level:"normal",game_speed:"normal",auto_save:!0,last_played:new Date().toISOString(),total_playtime:(((i=this.gameData.userSession)==null?void 0:i.totalPlaytime)||0)+60,is_active:!0,save_data:JSON.stringify(this.gameData),created_at:new Date().toISOString(),updated_at:new Date().toISOString()};return this.dataManager.saveToStorage(this.gameData,s),s}async loadSession(e){return console.log(`📂 Loading session: ${e}`),this.dataManager.getCurrentSession()?(this.gameData=this.dataManager.getGameData(),!0):!1}getSavedSessions(){const e=this.dataManager.getCurrentSession();return e?[e]:[]}getCurrentSession(){return this.dataManager.getCurrentSession()}saveGameData(){this.gameData&&this.dataManager.saveToStorage(this.gameData,null)}}class L{constructor(){this.gameManager=null,this.currentFilter="all",this.currentSort="name"}async init(){var e;if(console.log("📊 Initializing TeamManagementPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadTeamData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb" aria-label="Navigazione">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator" aria-hidden="true">></span>
                    <span class="breadcrumb-current">Squadra</span>
                </nav>

                <!-- Team Overview -->
                <div id="teamOverview" class="team-overview">
                    <!-- Will be populated by loadTeamData() -->
                </div>

                <!-- Sponsor Banner -->
                <div class="sponsor-slot sponsor-horizontal" aria-label="Sponsor">
                    <span class="sponsor-label">Partner Ufficiale</span>
                    <img src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=60&fit=crop" 
                         alt="Sponsor" class="sponsor-image">
                </div>

                <!-- Player Filters -->
                <div class="player-filters" aria-label="Filtri giocatori">
                    <div class="filter-group">
                        <label for="positionFilter">Ruolo:</label>
                        <select id="positionFilter" class="filter-select" aria-label="Filtra per ruolo">
                            <option value="all">Tutti</option>
                            <option value="GK">Portieri</option>
                            <option value="DEF">Difensori</option>
                            <option value="MID">Centrocampisti</option>
                            <option value="ATT">Attaccanti</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="sortSelect">Ordina per:</label>
                        <select id="sortSelect" class="filter-select" aria-label="Ordina per">
                            <option value="name">Nome</option>
                            <option value="age">Età</option>
                            <option value="overall_rating">Rating</option>
                            <option value="morale">Morale</option>
                            <option value="fitness">Forma</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <input type="text" id="searchInput" class="search-input" placeholder="Cerca giocatore..." 
                               aria-label="Cerca giocatore per nome">
                    </div>
                </div>

                <!-- Players Grid -->
                <div id="playersGrid" class="players-grid" aria-label="Lista giocatori">
                    <!-- Will be populated by loadPlayersGrid() -->
                </div>

                <!-- Sponsor Sidebar -->
                <div class="sponsor-slot sponsor-vertical" aria-label="Sponsor">
                    <span class="sponsor-label">Sponsor Tecnico</span>
                    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=160&h=400&fit=crop" 
                         alt="Sponsor Tecnico" class="sponsor-image">
                </div>

                <!-- Test Button -->
                <div class="test-actions">
                    <button id="newGameTestBtn" class="button button-primary">
                        🎮 Test Nuova Partita
                    </button>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s;(e=document.getElementById("positionFilter"))==null||e.addEventListener("change",n=>{this.currentFilter=n.target.value,this.loadPlayersGrid()}),(t=document.getElementById("sortSelect"))==null||t.addEventListener("change",n=>{this.currentSort=n.target.value,this.loadPlayersGrid()}),(a=document.getElementById("searchInput"))==null||a.addEventListener("input",n=>{this.searchTerm=n.target.value.toLowerCase(),this.loadPlayersGrid()}),(s=document.getElementById("newGameTestBtn"))==null||s.addEventListener("click",()=>{this.testNewGame()})}async testNewGame(){console.log("🧪 Testing new game creation...");try{window.boltManager.uiManager.showLoading("Creazione nuova partita di test..."),await this.gameManager.startNewGame(),this.loadTeamData(),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Nuova partita creata con successo!","success")}catch(e){console.error("Error in test new game:",e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nella creazione della partita","error")}}loadTeamData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available"),document.getElementById("teamOverview").innerHTML=`
                <div class="no-data">
                    <h3>Nessuna partita attiva</h3>
                    <p>Clicca su "Test Nuova Partita" per iniziare</p>
                </div>
            `;return}const e=this.gameManager.getUserTeam(),t=this.gameManager.getUserPlayers();if(!e||!t.length){console.log("No user team or players found");return}const a=t.reduce((o,r)=>o+r.age,0)/t.length,s=t.reduce((o,r)=>o+r.morale,0)/t.length,n=t.reduce((o,r)=>o+r.fitness,0)/t.length,i=t.reduce((o,r)=>o+r.market_value,0);document.getElementById("teamOverview").innerHTML=`
            <div class="team-overview-card">
                <div class="team-header">
                    <h2 class="team-name">${e.name}</h2>
                    <span class="team-city">${e.city}</span>
                </div>
                
                <div class="team-stats">
                    <div class="stat-item">
                        <span class="stat-label">Giocatori</span>
                        <span class="stat-value">${t.length}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Età Media</span>
                        <span class="stat-value">${a.toFixed(1)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Morale</span>
                        <span class="stat-value">
                            <div class="morale-indicator">
                                <div class="morale-bar" style="width: ${s}%; background-color: ${this.getMoraleColor(s)}"></div>
                                <span class="morale-text">${s.toFixed(0)}%</span>
                            </div>
                        </span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Forma Media</span>
                        <span class="stat-value">${n.toFixed(0)}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Valore Rosa</span>
                        <span class="stat-value">${this.formatCurrency(i)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Budget</span>
                        <span class="stat-value">${this.formatCurrency(e.budget)}</span>
                    </div>
                </div>
            </div>
        `,this.loadPlayersGrid()}loadPlayersGrid(){if(!this.gameManager||!this.gameManager.gameData)return;let e=this.gameManager.getUserPlayers();this.currentFilter!=="all"&&(e=e.filter(a=>a.position===this.currentFilter)),this.searchTerm&&(e=e.filter(a=>a.first_name.toLowerCase().includes(this.searchTerm)||a.last_name.toLowerCase().includes(this.searchTerm))),e.sort((a,s)=>{switch(this.currentSort){case"name":return`${a.first_name} ${a.last_name}`.localeCompare(`${s.first_name} ${s.last_name}`);case"age":return a.age-s.age;case"overall_rating":return s.overall_rating-a.overall_rating;case"morale":return s.morale-a.morale;case"fitness":return s.fitness-a.fitness;default:return 0}});const t=e.map(a=>this.renderPlayerCard(a)).join("");document.getElementById("playersGrid").innerHTML=t,this.setupPlayerCardListeners()}renderPlayerCard(e){const t=this.getMoraleColor(e.morale),a=this.getFitnessColor(e.fitness);return`
            <div class="player-card" data-player-id="${e.id}" tabindex="0" 
                 aria-label="Giocatore ${e.first_name} ${e.last_name}, ${e.position}, rating ${e.overall_rating}">
                <div class="player-header">
                    <div class="player-avatar">
                        <span class="player-position" aria-hidden="true">${e.position}</span>
                    </div>
                    <div class="player-info">
                        <h4 class="player-name">${e.first_name} ${e.last_name}</h4>
                        <span class="player-age">${e.age} anni</span>
                    </div>
                    <div class="player-rating">
                        <span class="rating-value">${e.overall_rating}</span>
                    </div>
                </div>
                
                <div class="player-stats">
                    <div class="stat-row">
                        <span class="stat-label">Morale</span>
                        <div class="progress-bar" role="progressbar" aria-valuenow="${Math.round(e.morale)}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-fill" style="width: ${e.morale}%; background-color: ${t}"></div>
                            <span class="progress-text">${Math.round(e.morale)}%</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Forma</span>
                        <div class="progress-bar" role="progressbar" aria-valuenow="${Math.round(e.fitness)}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-fill" style="width: ${e.fitness}%; background-color: ${a}"></div>
                            <span class="progress-text">${Math.round(e.fitness)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="player-status">
                    ${e.injury_status!=="healthy"?`<span class="status-badge status-injury" aria-label="Infortunato per ${e.injury_days} giorni">🤕 ${e.injury_days} giorni</span>`:'<span class="status-badge status-healthy" aria-label="Giocatore disponibile">✅ Disponibile</span>'}
                    ${e.is_captain?'<span class="status-badge status-captain" aria-label="Capitano della squadra">👑 Capitano</span>':""}
                </div>
            </div>
        `}setupPlayerCardListeners(){document.querySelectorAll(".player-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.playerId;this.showPlayerDetails(t)}),e.addEventListener("keydown",t=>{if(t.key==="Enter"||t.key===" "){t.preventDefault();const a=e.dataset.playerId;this.showPlayerDetails(a)}})})}showPlayerDetails(e){const t=this.gameManager.gameData.players.find(s=>s.id===e);if(!t)return;this.gameManager.getPlayerMorale(e);const a=`
            <div class="player-details">
                <div class="player-tabs">
                    <div class="tab-nav" role="tablist">
                        <button class="tab-btn active" data-tab="profile" role="tab" aria-selected="true" id="tab-profile" aria-controls="profile">Profilo</button>
                        <button class="tab-btn" data-tab="injuries" role="tab" aria-selected="false" id="tab-injuries" aria-controls="injuries">Infortuni</button>
                        <button class="tab-btn" data-tab="contract" role="tab" aria-selected="false" id="tab-contract" aria-controls="contract">Contratto</button>
                        <button class="tab-btn" data-tab="transfer" role="tab" aria-selected="false" id="tab-transfer" aria-controls="transfer">Trasferimento</button>
                        <button class="tab-btn" data-tab="history" role="tab" aria-selected="false" id="tab-history" aria-controls="history">Storia</button>
                    </div>
                    
                    <div class="tab-content">
                        <div class="tab-panel active" id="profile" role="tabpanel" aria-labelledby="tab-profile">
                            <h4>Attributi</h4>
                            <div class="attributes-grid">
                                <div class="attribute-item">
                                    <span class="attr-label">Velocità</span>
                                    <span class="attr-value">${t.pace}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Tiro</span>
                                    <span class="attr-value">${t.shooting}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Passaggio</span>
                                    <span class="attr-value">${t.passing}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Dribbling</span>
                                    <span class="attr-value">${t.dribbling}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Difesa</span>
                                    <span class="attr-value">${t.defending}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Fisico</span>
                                    <span class="attr-value">${t.physical}</span>
                                </div>
                            </div>
                            
                            <h4>Informazioni</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Età</span>
                                    <span class="info-value">${t.age} anni</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Ruolo</span>
                                    <span class="info-value">${t.position}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Potenziale</span>
                                    <span class="info-value">${t.potential}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="injuries" role="tabpanel" aria-labelledby="tab-injuries">
                            <h4>Stato Fisico</h4>
                            <div class="injury-status">
                                ${t.injury_status==="healthy"?'<p class="status-healthy">✅ Il giocatore è in perfetta forma</p>':`<p class="status-injured">🤕 Infortunato - ${t.injury_days} giorni rimanenti</p>`}
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="contract" role="tabpanel" aria-labelledby="tab-contract">
                            <h4>Dettagli Contratto</h4>
                            <div class="contract-info">
                                <div class="contract-item">
                                    <span class="contract-label">Stipendio</span>
                                    <span class="contract-value">${this.formatCurrency(t.salary)}/settimana</span>
                                </div>
                                <div class="contract-item">
                                    <span class="contract-label">Scadenza</span>
                                    <span class="contract-value">${new Date(t.contract_expires).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="transfer" role="tabpanel" aria-labelledby="tab-transfer">
                            <h4>Valore di Mercato</h4>
                            <div class="transfer-info">
                                <div class="value-display">
                                    <span class="value-amount">${this.formatCurrency(t.market_value)}</span>
                                    <span class="value-label">Valore attuale</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="history" role="tabpanel" aria-labelledby="tab-history">
                            <h4>Statistiche Stagione</h4>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <span class="stat-label">Partite</span>
                                    <span class="stat-value">${t.matches_played}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Gol</span>
                                    <span class="stat-value">${t.goals_scored}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Assist</span>
                                    <span class="stat-value">${t.assists}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Cartellini Gialli</span>
                                    <span class="stat-value">${t.yellow_cards}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Cartellini Rossi</span>
                                    <span class="stat-value">${t.red_cards}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal(`${t.first_name} ${t.last_name}`,a),this.setupTabNavigation()}setupTabNavigation(){document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;document.querySelectorAll(".tab-btn").forEach(a=>{a.classList.remove("active"),a.setAttribute("aria-selected","false")}),document.querySelectorAll(".tab-panel").forEach(a=>a.classList.remove("active")),e.classList.add("active"),e.setAttribute("aria-selected","true"),document.getElementById(t).classList.add("active")})})}getMoraleColor(e){return e>=70?"var(--success)":e>=40?"var(--warning)":"var(--error)"}getFitnessColor(e){return e>=80?"var(--success)":e>=60?"var(--warning)":"var(--error)"}formatCurrency(e){return new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(e)}}class x{constructor(){this.gameManager=null,this.selectedPlayers=[],this.currentTrainingType="fitness",this.currentIntensity=3}async init(){var e;if(console.log("🏃 Initializing TrainingManagementPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadTrainingData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Allenamento</span>
                </nav>

                <!-- Training Overview -->
                <div class="training-overview">
                    <h2>Gestione Allenamenti</h2>
                    <div class="current-date">
                        <span class="date-label">Data corrente:</span>
                        <span id="currentGameDate" class="date-value">--</span>
                    </div>
                </div>

                <!-- Training Scheduler -->
                <div class="training-scheduler">
                    <h3>Pianificazione Settimanale</h3>
                    <div id="weeklySchedule" class="weekly-schedule">
                        <!-- Will be populated by loadWeeklySchedule() -->
                    </div>
                </div>

                <!-- Training Setup -->
                <div class="training-setup">
                    <div class="training-controls">
                        <div class="control-group">
                            <h4>Tipo Allenamento</h4>
                            <div class="training-types">
                                <button class="training-type-btn active" data-type="fitness">
                                    💪 Fisico
                                </button>
                                <button class="training-type-btn" data-type="technical">
                                    ⚽ Tecnico
                                </button>
                                <button class="training-type-btn" data-type="tactical">
                                    🧠 Tattico
                                </button>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Intensità</h4>
                            <div class="intensity-control">
                                <input type="range" id="intensitySlider" min="1" max="5" value="3" class="intensity-slider">
                                <div class="intensity-labels">
                                    <span>Leggero</span>
                                    <span>Moderato</span>
                                    <span>Intenso</span>
                                    <span>Molto Intenso</span>
                                    <span>Massimo</span>
                                </div>
                                <div class="intensity-value">
                                    Intensità: <span id="intensityValue">3</span>/5
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Player Selection -->
                    <div class="player-selection">
                        <h4>Selezione Giocatori</h4>
                        <div class="selection-controls">
                            <button id="selectAllBtn" class="button button-secondary">Seleziona Tutti</button>
                            <button id="selectNoneBtn" class="button button-secondary">Deseleziona Tutti</button>
                            <button id="selectAvailableBtn" class="button button-secondary">Solo Disponibili</button>
                        </div>
                        <div id="playerSelectionList" class="player-selection-list">
                            <!-- Will be populated by loadPlayerSelection() -->
                        </div>
                    </div>

                    <!-- Training Actions -->
                    <div class="training-actions">
                        <button id="executeTrainingBtn" class="button button-primary button-large">
                            🏃 Esegui Allenamento Oggi
                        </button>
                        <button id="scheduleTrainingBtn" class="button button-secondary">
                            📅 Programma per Domani
                        </button>
                    </div>
                </div>

                <!-- Sponsor Slot -->
                <div class="sponsor-horizontal">
                    <img src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800&h=80&fit=crop" 
                         alt="Sponsor Training" class="sponsor-image">
                </div>

                <!-- Training History -->
                <div class="training-history">
                    <h3>Allenamenti Recenti</h3>
                    <div id="trainingHistoryList" class="training-history-list">
                        <!-- Will be populated by loadTrainingHistory() -->
                    </div>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s,n,i;document.addEventListener("click",o=>{o.target.classList.contains("training-type-btn")&&(document.querySelectorAll(".training-type-btn").forEach(r=>r.classList.remove("active")),o.target.classList.add("active"),this.currentTrainingType=o.target.dataset.type,this.updateTrainingPreview())}),(e=document.getElementById("intensitySlider"))==null||e.addEventListener("input",o=>{this.currentIntensity=parseInt(o.target.value),document.getElementById("intensityValue").textContent=this.currentIntensity,this.updateTrainingPreview()}),(t=document.getElementById("selectAllBtn"))==null||t.addEventListener("click",()=>{this.selectAllPlayers()}),(a=document.getElementById("selectNoneBtn"))==null||a.addEventListener("click",()=>{this.selectNoPlayers()}),(s=document.getElementById("selectAvailableBtn"))==null||s.addEventListener("click",()=>{this.selectAvailablePlayers()}),(n=document.getElementById("executeTrainingBtn"))==null||n.addEventListener("click",()=>{this.executeTraining()}),(i=document.getElementById("scheduleTrainingBtn"))==null||i.addEventListener("click",()=>{this.scheduleTraining()})}loadTrainingData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available");return}const e=new Date(this.gameManager.getCurrentDate());document.getElementById("currentGameDate").textContent=e.toLocaleDateString("it-IT"),this.loadWeeklySchedule(),this.loadPlayerSelection(),this.loadTrainingHistory()}loadWeeklySchedule(){const e=new Date(this.gameManager.getCurrentDate()),t=new Date(e);t.setDate(e.getDate()-e.getDay()+1);const a=[];for(let n=0;n<7;n++){const i=new Date(t);i.setDate(t.getDate()+n),a.push(i)}const s=a.map((n,i)=>{const o=n.toLocaleDateString("it-IT",{weekday:"short"}),r=n.toLocaleDateString("it-IT",{day:"numeric",month:"short"}),l=n.toDateString()===e.toDateString(),d=this.gameManager.gameData.trainings.find(c=>new Date(c.training_date).toDateString()===n.toDateString());return`
                <div class="schedule-day ${l?"today":""}" data-date="${n.toISOString()}">
                    <div class="day-header">
                        <span class="day-name">${o}</span>
                        <span class="day-date">${r}</span>
                    </div>
                    <div class="day-content">
                        ${d?`
                            <div class="scheduled-training">
                                <span class="training-icon">🏃</span>
                                <span class="training-type">${d.training_type}</span>
                                <span class="training-intensity">Int. ${d.intensity}</span>
                            </div>
                        `:`
                            <div class="no-training">
                                <span class="no-training-text">Riposo</span>
                            </div>
                        `}
                    </div>
                </div>
            `}).join("");document.getElementById("weeklySchedule").innerHTML=s}loadPlayerSelection(){const t=this.gameManager.getUserPlayers().map(a=>{const s=a.injury_status==="healthy",n=this.selectedPlayers.includes(a.id);return`
                <div class="player-selection-item ${s?"":"unavailable"}" data-player-id="${a.id}">
                    <label class="player-checkbox">
                        <input type="checkbox" ${n?"checked":""} ${s?"":"disabled"}>
                        <span class="checkmark"></span>
                    </label>
                    <div class="player-info">
                        <span class="player-name">${a.first_name} ${a.last_name}</span>
                        <span class="player-position">${a.position}</span>
                        <span class="player-fitness">Forma: ${Math.round(a.fitness)}%</span>
                    </div>
                    <div class="player-status">
                        ${s?'<span class="status-available">✅</span>':`<span class="status-injury">🤕 ${a.injury_days}g</span>`}
                    </div>
                </div>
            `}).join("");document.getElementById("playerSelectionList").innerHTML=t,document.querySelectorAll('.player-selection-item input[type="checkbox"]').forEach(a=>{a.addEventListener("change",s=>{const n=s.target.closest(".player-selection-item").dataset.playerId;s.target.checked?this.selectedPlayers.includes(n)||this.selectedPlayers.push(n):this.selectedPlayers=this.selectedPlayers.filter(i=>i!==n),this.updateTrainingPreview()})})}loadTrainingHistory(){const e=this.gameManager.gameData.trainings.filter(a=>a.status==="completed").sort((a,s)=>new Date(s.training_date)-new Date(a.training_date)).slice(0,5);if(e.length===0){document.getElementById("trainingHistoryList").innerHTML=`
                <div class="no-history">
                    <p>Nessun allenamento completato</p>
                </div>
            `;return}const t=e.map(a=>`
                <div class="training-history-item">
                    <div class="training-info">
                        <span class="training-date">${new Date(a.training_date).toLocaleDateString("it-IT")}</span>
                        <span class="training-type">${a.training_type}</span>
                        <span class="training-intensity">Intensità ${a.intensity}</span>
                    </div>
                    <div class="training-results">
                        <span class="participants">${a.participants.length} giocatori</span>
                        ${a.injuries_occurred.length>0?`<span class="injuries">⚠️ ${a.injuries_occurred.length} infortuni</span>`:'<span class="no-injuries">✅ Nessun infortunio</span>'}
                    </div>
                </div>
            `).join("");document.getElementById("trainingHistoryList").innerHTML=t}selectAllPlayers(){const e=this.gameManager.getUserPlayers();this.selectedPlayers=e.map(t=>t.id),this.updatePlayerSelection()}selectNoPlayers(){this.selectedPlayers=[],this.updatePlayerSelection()}selectAvailablePlayers(){const e=this.gameManager.getUserPlayers();this.selectedPlayers=e.filter(t=>t.injury_status==="healthy").map(t=>t.id),this.updatePlayerSelection()}updatePlayerSelection(){document.querySelectorAll('.player-selection-item input[type="checkbox"]').forEach(e=>{const t=e.closest(".player-selection-item").dataset.playerId;e.checked=this.selectedPlayers.includes(t)}),this.updateTrainingPreview()}updateTrainingPreview(){const e=document.getElementById("executeTrainingBtn");e&&(e.disabled=this.selectedPlayers.length===0,e.textContent=`🏃 Esegui Allenamento (${this.selectedPlayers.length} giocatori)`)}async executeTraining(){if(this.selectedPlayers.length===0){window.boltManager.uiManager.showToast("Seleziona almeno un giocatore","warning");return}try{window.boltManager.uiManager.showLoading("Esecuzione allenamento...");const e=this.gameManager.getUserTeam(),t=await this.gameManager.executePlayerTrain({playerIds:this.selectedPlayers,trainingType:this.currentTrainingType,intensity:this.currentIntensity,teamId:e.id});window.boltManager.uiManager.hideLoading(),this.showTrainingResults(t),this.loadTrainingData(),window.boltManager.uiManager.showToast("Allenamento completato con successo!","success")}catch(e){console.error("Error executing training:",e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore durante l'allenamento: "+e.message,"error")}}async scheduleTraining(){if(this.selectedPlayers.length===0){window.boltManager.uiManager.showToast("Seleziona almeno un giocatore","warning");return}try{const e=this.gameManager.getUserTeam(),t=new Date(this.gameManager.getCurrentDate());t.setDate(t.getDate()+1);const a=this.gameManager.scheduleTraining({playerIds:this.selectedPlayers,type:this.currentTrainingType,intensity:this.currentIntensity,teamId:e.id,date:t.toISOString()});this.loadWeeklySchedule(),window.boltManager.uiManager.showToast("Allenamento programmato per domani","success")}catch(e){console.error("Error scheduling training:",e),window.boltManager.uiManager.showToast("Errore nella programmazione","error")}}showTrainingResults(e){const{trainingRecord:t,results:a}=e,s=a.filter(o=>Object.keys(o.attributeChanges).length>0).map(o=>{const r=this.gameManager.gameData.players.find(d=>d.id===o.playerId),l=Object.entries(o.attributeChanges).map(([d,c])=>`${d}: +${c}`).join(", ");return`
                    <div class="player-improvement">
                        <span class="player-name">${r.first_name} ${r.last_name}</span>
                        <span class="improvements">${l}</span>
                    </div>
                `}).join(""),n=a.filter(o=>o.injury).map(o=>{const r=this.gameManager.gameData.players.find(l=>l.id===o.playerId);return`
                    <div class="player-injury">
                        <span class="player-name">${r.first_name} ${r.last_name}</span>
                        <span class="injury-info">🤕 ${o.injury.description} (${o.injury.days} giorni)</span>
                    </div>
                `}).join(""),i=`
            <div class="training-results">
                <div class="results-summary">
                    <h4>Riepilogo Allenamento</h4>
                    <div class="summary-stats">
                        <div class="stat-item">
                            <span class="stat-label">Tipo:</span>
                            <span class="stat-value">${t.training_type}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Intensità:</span>
                            <span class="stat-value">${t.intensity}/5</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Partecipanti:</span>
                            <span class="stat-value">${t.participants.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Infortuni:</span>
                            <span class="stat-value">${a.filter(o=>o.injury).length}</span>
                        </div>
                    </div>
                </div>

                ${s?`
                    <div class="improvements-section">
                        <h4>Miglioramenti</h4>
                        <div class="improvements-list">
                            ${s}
                        </div>
                    </div>
                `:""}

                ${n?`
                    <div class="injuries-section">
                        <h4>Infortuni</h4>
                        <div class="injuries-list">
                            ${n}
                        </div>
                    </div>
                `:""}
            </div>
        `;window.boltManager.uiManager.showModal("Risultati Allenamento",i)}}class k{constructor(){this.gameManager=null,this.currentViewDate=new Date}async init(){var e;if(console.log("📅 Initializing CalendarViewPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadCalendarData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb" aria-label="Navigazione">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator" aria-hidden="true">></span>
                    <span class="breadcrumb-current">Calendario</span>
                </nav>

                <!-- Calendar Header -->
                <div class="calendar-header">
                    <div class="calendar-navigation">
                        <button id="prevMonthBtn" class="button button-ghost" aria-label="Mese precedente">‹ Precedente</button>
                        <h2 id="currentMonthYear" class="month-year">--</h2>
                        <button id="nextMonthBtn" class="button button-ghost" aria-label="Mese successivo">Successivo ›</button>
                    </div>
                    <div class="current-game-date">
                        <span class="date-label">Data di gioco:</span>
                        <span id="currentGameDate" class="date-value">--</span>
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="calendar-container">
                    <div class="calendar-grid" role="grid" aria-label="Calendario mensile">
                        <div class="calendar-header-row" role="row">
                            <div class="calendar-day-header" role="columnheader">Lun</div>
                            <div class="calendar-day-header" role="columnheader">Mar</div>
                            <div class="calendar-day-header" role="columnheader">Mer</div>
                            <div class="calendar-day-header" role="columnheader">Gio</div>
                            <div class="calendar-day-header" role="columnheader">Ven</div>
                            <div class="calendar-day-header" role="columnheader">Sab</div>
                            <div class="calendar-day-header" role="columnheader">Dom</div>
                        </div>
                        <div id="calendarDays" class="calendar-days">
                            <!-- Will be populated by loadCalendarGrid() -->
                        </div>
                    </div>
                </div>

                <!-- Sponsor Box -->
                <div class="sponsor-slot sponsor-horizontal" aria-label="Sponsor">
                    <span class="sponsor-label">Partner Ufficiale</span>
                    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                         alt="Sponsor Calendar" class="sponsor-image">
                </div>

                <!-- Calendar Actions -->
                <div class="calendar-actions">
                    <button id="advanceDayBtn" class="button button-primary button-large" aria-label="Avanza di un giorno">
                        ⏭️ Avanza di 1 Giorno
                    </button>
                    <button id="advanceWeekBtn" class="button button-secondary" aria-label="Avanza di una settimana">
                        📅 Avanza di 1 Settimana
                    </button>
                    <button id="todayBtn" class="button button-ghost" aria-label="Vai a oggi">
                        📍 Oggi
                    </button>
                </div>

                <!-- Upcoming Events -->
                <div class="upcoming-events">
                    <h3>Prossimi Eventi</h3>
                    <div id="upcomingEventsList" class="events-list" aria-label="Lista prossimi eventi">
                        <!-- Will be populated by loadUpcomingEvents() -->
                    </div>
                </div>

                <!-- Recent Events -->
                <div class="recent-events">
                    <h3>Eventi Recenti</h3>
                    <div id="recentEventsList" class="events-list" aria-label="Lista eventi recenti">
                        <!-- Will be populated by loadRecentEvents() -->
                    </div>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s,n;(e=document.getElementById("prevMonthBtn"))==null||e.addEventListener("click",()=>{this.currentViewDate.setMonth(this.currentViewDate.getMonth()-1),this.loadCalendarGrid()}),(t=document.getElementById("nextMonthBtn"))==null||t.addEventListener("click",()=>{this.currentViewDate.setMonth(this.currentViewDate.getMonth()+1),this.loadCalendarGrid()}),(a=document.getElementById("todayBtn"))==null||a.addEventListener("click",()=>{this.currentViewDate=new Date(this.gameManager.getCurrentDate()),this.loadCalendarGrid()}),(s=document.getElementById("advanceDayBtn"))==null||s.addEventListener("click",()=>{this.advanceDay(1)}),(n=document.getElementById("advanceWeekBtn"))==null||n.addEventListener("click",()=>{this.advanceDay(7)})}loadCalendarData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available");return}this.currentViewDate=new Date(this.gameManager.getCurrentDate());const e=new Date(this.gameManager.getCurrentDate());document.getElementById("currentGameDate").textContent=e.toLocaleDateString("it-IT",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),this.loadCalendarGrid(),this.loadUpcomingEvents(),this.loadRecentEvents()}loadCalendarGrid(){document.getElementById("currentMonthYear").textContent=this.currentViewDate.toLocaleDateString("it-IT",{year:"numeric",month:"long"});const e=this.currentViewDate.getFullYear(),t=this.currentViewDate.getMonth(),a=new Date(e,t,1),s=new Date(a),n=(a.getDay()+6)%7;s.setDate(a.getDate()-n);const i=[],o=new Date(this.gameManager.getCurrentDate());for(let l=0;l<6;l++)for(let d=0;d<7;d++){const c=new Date(s);c.setDate(s.getDate()+l*7+d);const u=c.getMonth()===t,g=c.toDateString()===o.toDateString(),p=c<o,m=c>o,v=this.getEventsForDate(c);i.push({date:c,isCurrentMonth:u,isToday:g,isPast:p,isFuture:m,events:v})}const r=i.map((l,d)=>{const c=["calendar-day",l.isCurrentMonth?"":"other-month",l.isToday?"today":"",l.isPast?"past":"",l.isFuture?"future":"",l.events.length>0?"has-events":""].filter(Boolean).join(" "),u=l.events.slice(0,3).map(p=>`<div class="calendar-event ${`event-${p.type}`}" title="${p.title}">${p.icon}</div>`).join(""),g=l.events.length>3?`<div class="more-events">+${l.events.length-3}</div>`:"";return`
                <div class="${c}" data-date="${l.date.toISOString()}" tabindex="0" 
                     role="gridcell" aria-label="${l.date.toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"})}${l.events.length>0?`, ${l.events.length} eventi`:""}">
                    <div class="day-number">${l.date.getDate()}</div>
                    <div class="day-events">
                        ${u}
                        ${g}
                    </div>
                </div>
            `}).join("");document.getElementById("calendarDays").innerHTML=r,document.querySelectorAll(".calendar-day").forEach(l=>{l.addEventListener("click",()=>{const d=new Date(l.dataset.date);this.showDayDetails(d)}),l.addEventListener("keydown",d=>{if(d.key==="Enter"||d.key===" "){d.preventDefault();const c=new Date(l.dataset.date);this.showDayDetails(c)}})})}getEventsForDate(e){const t=[],a=e.toDateString();return this.gameManager.gameData.matches.filter(o=>new Date(o.match_date).toDateString()===a&&o.is_user_match).forEach(o=>{const r=this.gameManager.gameData.teams.find(d=>d.id===o.home_team_id),l=this.gameManager.gameData.teams.find(d=>d.id===o.away_team_id);t.push({type:"match",icon:"⚽",title:`${(r==null?void 0:r.short_name)||"HOME"} vs ${(l==null?void 0:l.short_name)||"AWAY"}`,description:`Giornata ${o.matchday}`,priority:4})}),this.gameManager.gameData.trainings.filter(o=>new Date(o.training_date).toDateString()===a).forEach(o=>{t.push({type:"training",icon:"🏃",title:`Allenamento ${o.training_type}`,description:`Intensità ${o.intensity}`,priority:2})}),this.gameManager.gameData.gameEvents.filter(o=>new Date(o.game_date).toDateString()===a).forEach(o=>{const r={match:"⚽",training:"🏃",transfer:"💰",news:"📰",injury:"🤕"};t.push({type:o.event_type,icon:r[o.event_type]||"ℹ️",title:o.title,description:o.description,priority:o.priority})}),t.sort((o,r)=>r.priority-o.priority)}loadUpcomingEvents(){const e=this.gameManager.getUpcomingEvents(14);if(e.length===0){document.getElementById("upcomingEventsList").innerHTML=`
                <div class="no-events">
                    <p>Nessun evento in programma</p>
                </div>
            `;return}const t=e.slice(0,10).map(a=>{const s=new Date(a.date),n=Math.ceil((s-new Date(this.gameManager.getCurrentDate()))/(1e3*60*60*24));return`
                <div class="event-item ${a.priority>=4?"high-priority":a.priority>=3?"medium-priority":"low-priority"}" tabindex="0" aria-label="${a.title}, ${a.description}, ${n===0?"Oggi":n===1?"Domani":`Tra ${n} giorni`}">
                    <div class="event-date">
                        <span class="event-day">${s.toLocaleDateString("it-IT",{weekday:"short"})}</span>
                        <span class="event-date-num">${s.getDate()}</span>
                        <span class="event-month">${s.toLocaleDateString("it-IT",{month:"short"})}</span>
                    </div>
                    <div class="event-info">
                        <h4 class="event-title">${a.title}</h4>
                        <p class="event-description">${a.description}</p>
                        <span class="event-time">
                            ${n===0?"Oggi":n===1?"Domani":`Tra ${n} giorni`}
                        </span>
                    </div>
                    <div class="event-type">
                        <span class="event-icon" aria-hidden="true">${this.getEventIcon(a.type)}</span>
                    </div>
                </div>
            `}).join("");document.getElementById("upcomingEventsList").innerHTML=t}loadRecentEvents(){const e=this.gameManager.gameData.gameEvents.filter(a=>a.is_user_relevant).sort((a,s)=>new Date(s.event_date)-new Date(a.event_date)).slice(0,5);if(e.length===0){document.getElementById("recentEventsList").innerHTML=`
                <div class="no-events">
                    <p>Nessun evento recente</p>
                </div>
            `;return}const t=e.map(a=>{const s=new Date(a.event_date);return`
                <div class="event-item ${`category-${a.event_category}`}" tabindex="0" aria-label="${a.title}: ${a.description}">
                    <div class="event-date">
                        <span class="event-time">${s.toLocaleDateString("it-IT")}</span>
                    </div>
                    <div class="event-info">
                        <h4 class="event-title">${a.title}</h4>
                        <p class="event-description">${a.description}</p>
                    </div>
                    <div class="event-type">
                        <span class="event-icon" aria-hidden="true">${this.getEventIcon(a.event_type)}</span>
                    </div>
                </div>
            `}).join("");document.getElementById("recentEventsList").innerHTML=t}getEventIcon(e){return{match:"⚽",training:"🏃",transfer:"💰",news:"📰",injury:"🤕",contract:"📝",achievement:"🏆"}[e]||"ℹ️"}async advanceDay(e=1){try{window.boltManager.uiManager.showLoading(`Avanzamento di ${e} giorno${e>1?"i":""}...`);const t=await this.gameManager.executeAdvanceDay(e);this.loadCalendarData(),window.boltManager.uiManager.hideLoading();const a=new Date(t.newDate);window.boltManager.uiManager.showToast(`Avanzato al ${a.toLocaleDateString("it-IT")}`,"success");const s=t.eventsGenerated.filter(n=>n.priority>=3);s.length>0&&setTimeout(()=>{s.forEach(n=>{window.boltManager.uiManager.showToast(n.title,"info",5e3)})},1e3)}catch(t){console.error("Error advancing day:",t),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nell'avanzamento: "+t.message,"error")}}showDayDetails(e){const t=this.getEventsForDate(e),a=e.toLocaleDateString("it-IT",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),s=t.length>0?t.map(i=>`
                <div class="day-detail-event">
                    <span class="event-icon" aria-hidden="true">${i.icon}</span>
                    <div class="event-content">
                        <h4>${i.title}</h4>
                        <p>${i.description}</p>
                    </div>
                </div>
            `).join(""):"<p>Nessun evento programmato per questo giorno</p>",n=`
            <div class="day-details">
                <h3>${a}</h3>
                <div class="day-events-list" aria-label="Eventi del giorno">
                    ${s}
                </div>
            </div>
        `;window.boltManager.uiManager.showModal(`Eventi del ${e.getDate()}`,n)}}class P{constructor(){this.gameManager=null,this.currentFormation="4-4-2",this.currentMentality="balanced",this.currentTempo="normal",this.currentWidth="normal",this.currentPressing="medium",this.currentDefensiveLine="normal",this.currentPassingStyle="mixed",this.currentCrossing="normal",this.selectedPlayers={},this.playerPositions=[],this.playerRoles=[]}async init(){var e;if(console.log("⚙️ Initializing TacticalSetupPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadTacticalData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Tattiche</span>
                </nav>

                <!-- Tactical Overview -->
                <div class="tactical-overview">
                    <h2>Impostazioni Tattiche</h2>
                    <div id="tacticalEffectiveness" class="tactical-effectiveness">
                        <span class="effectiveness-label">Efficacia Tattica:</span>
                        <span id="effectivenessValue" class="effectiveness-value">--</span>
                        <div class="effectiveness-bar">
                            <div id="effectivenessProgress" class="effectiveness-progress"></div>
                        </div>
                    </div>
                </div>

                <!-- Formation and Field -->
                <div class="tactical-main">
                    <div class="formation-controls">
                        <h3>Modulo</h3>
                        <select id="formationSelect" class="formation-select">
                            <option value="4-4-2">4-4-2</option>
                            <option value="4-3-3">4-3-3</option>
                            <option value="3-5-2">3-5-2</option>
                            <option value="4-2-3-1">4-2-3-1</option>
                            <option value="5-3-2">5-3-2</option>
                            <option value="4-5-1">4-5-1</option>
                        </select>
                    </div>

                    <div class="tactical-field-container">
                        <div id="tacticalField" class="tactical-field">
                            <!-- Will be populated by loadTacticalField() -->
                        </div>
                    </div>

                    <div class="tactical-settings">
                        <h3>Impostazioni</h3>
                        
                        <div class="setting-group">
                            <label>Mentalità</label>
                            <select id="mentalitySelect">
                                <option value="defensive">Difensiva</option>
                                <option value="balanced" selected>Equilibrata</option>
                                <option value="attacking">Offensiva</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Ritmo</label>
                            <select id="tempoSelect">
                                <option value="slow">Lento</option>
                                <option value="normal" selected>Normale</option>
                                <option value="fast">Veloce</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Ampiezza</label>
                            <select id="widthSelect">
                                <option value="narrow">Stretta</option>
                                <option value="normal" selected>Normale</option>
                                <option value="wide">Ampia</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Pressing</label>
                            <select id="pressingSelect">
                                <option value="low">Basso</option>
                                <option value="medium" selected>Medio</option>
                                <option value="high">Alto</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Linea Difensiva</label>
                            <select id="defensiveLineSelect">
                                <option value="deep">Bassa</option>
                                <option value="normal" selected>Normale</option>
                                <option value="high">Alta</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Stile Passaggi</label>
                            <select id="passingStyleSelect">
                                <option value="short">Corti</option>
                                <option value="mixed" selected>Misti</option>
                                <option value="long">Lunghi</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Sponsor Banner -->
                <div class="sponsor-banner">
                    <img src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                         alt="Sponsor Tactics" class="sponsor-image">
                </div>

                <!-- Player Selection -->
                <div class="player-selection-panel">
                    <h3>Selezione Giocatori</h3>
                    <div id="playerSelectionGrid" class="player-selection-grid">
                        <!-- Will be populated by loadPlayerSelection() -->
                    </div>
                </div>

                <!-- Set Pieces -->
                <div class="set-pieces">
                    <h3>Calci Piazzati</h3>
                    <div class="set-pieces-grid">
                        <div class="set-piece-item">
                            <label>Capitano</label>
                            <select id="captainSelect">
                                <option value="">Seleziona...</option>
                            </select>
                        </div>
                        <div class="set-piece-item">
                            <label>Rigorista</label>
                            <select id="penaltyTakerSelect">
                                <option value="">Seleziona...</option>
                            </select>
                        </div>
                        <div class="set-piece-item">
                            <label>Punizioni</label>
                            <select id="freeKickTakerSelect">
                                <option value="">Seleziona...</option>
                            </select>
                        </div>
                        <div class="set-piece-item">
                            <label>Corner</label>
                            <select id="cornerTakerSelect">
                                <option value="">Seleziona...</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="tactical-actions">
                    <button id="saveTacticsBtn" class="button button-primary button-large">
                        💾 Salva Tattica
                    </button>
                    <button id="resetTacticsBtn" class="button button-secondary">
                        🔄 Ripristina
                    </button>
                    <button id="previewTacticsBtn" class="button button-ghost">
                        👁️ Anteprima
                    </button>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s;(e=document.getElementById("formationSelect"))==null||e.addEventListener("change",n=>{this.currentFormation=n.target.value,this.loadTacticalField(),this.updateTacticalEffectiveness()}),["mentality","tempo","width","pressing","defensiveLine","passingStyle"].forEach(n=>{const i=document.getElementById(`${n}Select`);i==null||i.addEventListener("change",o=>{this[`current${n.charAt(0).toUpperCase()+n.slice(1)}`]=o.target.value,this.updateTacticalEffectiveness()})}),(t=document.getElementById("saveTacticsBtn"))==null||t.addEventListener("click",()=>{this.saveTactics()}),(a=document.getElementById("resetTacticsBtn"))==null||a.addEventListener("click",()=>{this.resetTactics()}),(s=document.getElementById("previewTacticsBtn"))==null||s.addEventListener("click",()=>{this.previewTactics()})}loadTacticalData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available");return}const e=this.gameManager.getUserTeam();if(!e)return;const t=this.gameManager.getTeamTactics(e.id);t&&(this.currentFormation=t.formation,this.currentMentality=t.mentality,this.currentTempo=t.tempo,this.currentWidth=t.width,this.currentPressing=t.pressing,this.currentDefensiveLine=t.defensive_line,this.currentPassingStyle=t.passing_style,this.currentCrossing=t.crossing,document.getElementById("formationSelect").value=this.currentFormation,document.getElementById("mentalitySelect").value=this.currentMentality,document.getElementById("tempoSelect").value=this.currentTempo,document.getElementById("widthSelect").value=this.currentWidth,document.getElementById("pressingSelect").value=this.currentPressing,document.getElementById("defensiveLineSelect").value=this.currentDefensiveLine,document.getElementById("passingStyleSelect").value=this.currentPassingStyle),this.loadTacticalField(),this.loadPlayerSelection(),this.updateTacticalEffectiveness()}loadTacticalField(){const e=`
            <div class="field-background">
                <div class="field-lines">
                    <div class="center-circle"></div>
                    <div class="penalty-area penalty-area-top"></div>
                    <div class="penalty-area penalty-area-bottom"></div>
                    <div class="goal-area goal-area-top"></div>
                    <div class="goal-area goal-area-bottom"></div>
                </div>
                <div id="playerPositions" class="player-positions">
                    ${this.generatePlayerPositions()}
                </div>
            </div>
        `;document.getElementById("tacticalField").innerHTML=e,this.setupFieldInteractions()}generatePlayerPositions(){const e={"4-4-2":[{position:"GK",x:50,y:90},{position:"DEF",x:20,y:75},{position:"DEF",x:40,y:75},{position:"DEF",x:60,y:75},{position:"DEF",x:80,y:75},{position:"MID",x:20,y:50},{position:"MID",x:40,y:50},{position:"MID",x:60,y:50},{position:"MID",x:80,y:50},{position:"ATT",x:35,y:25},{position:"ATT",x:65,y:25}],"4-3-3":[{position:"GK",x:50,y:90},{position:"DEF",x:20,y:75},{position:"DEF",x:40,y:75},{position:"DEF",x:60,y:75},{position:"DEF",x:80,y:75},{position:"MID",x:30,y:55},{position:"MID",x:50,y:55},{position:"MID",x:70,y:55},{position:"ATT",x:20,y:25},{position:"ATT",x:50,y:25},{position:"ATT",x:80,y:25}],"3-5-2":[{position:"GK",x:50,y:90},{position:"DEF",x:30,y:75},{position:"DEF",x:50,y:75},{position:"DEF",x:70,y:75},{position:"MID",x:15,y:50},{position:"MID",x:35,y:50},{position:"MID",x:50,y:50},{position:"MID",x:65,y:50},{position:"MID",x:85,y:50},{position:"ATT",x:40,y:25},{position:"ATT",x:60,y:25}],"4-2-3-1":[{position:"GK",x:50,y:90},{position:"DEF",x:20,y:75},{position:"DEF",x:40,y:75},{position:"DEF",x:60,y:75},{position:"DEF",x:80,y:75},{position:"MID",x:35,y:60},{position:"MID",x:65,y:60},{position:"MID",x:25,y:40},{position:"MID",x:50,y:40},{position:"MID",x:75,y:40},{position:"ATT",x:50,y:25}]},t=e[this.currentFormation]||e["4-4-2"];return this.playerPositions=t,t.map((a,s)=>`
            <div class="field-position" 
                 data-index="${s}" 
                 data-position="${a.position}"
                 style="left: ${a.x}%; top: ${a.y}%;"
                 tabindex="0">
                <div class="position-slot">
                    <span class="position-label">${a.position}</span>
                    <div class="player-slot" id="playerSlot${s}">
                        <span class="player-name">Seleziona</span>
                    </div>
                </div>
            </div>
        `).join("")}setupFieldInteractions(){document.querySelectorAll(".field-position").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.index);this.showPlayerSelector(t)}),e.addEventListener("keydown",t=>{if(t.key==="Enter"||t.key===" "){t.preventDefault();const a=parseInt(e.dataset.index);this.showPlayerSelector(a)}})})}loadPlayerSelection(){const t=this.gameManager.getUserPlayers().filter(n=>n.injury_status==="healthy"),a={GK:t.filter(n=>n.position==="GK"),DEF:t.filter(n=>n.position==="DEF"),MID:t.filter(n=>n.position==="MID"),ATT:t.filter(n=>n.position==="ATT")},s=Object.entries(a).map(([n,i])=>`
            <div class="position-group">
                <h4 class="position-title">${this.getPositionName(n)}</h4>
                <div class="players-list">
                    ${i.map(o=>`
                        <div class="player-selection-card" data-player-id="${o.id}" data-position="${n}">
                            <div class="player-info">
                                <span class="player-name">${o.first_name} ${o.last_name}</span>
                                <span class="player-rating">${o.overall_rating}</span>
                            </div>
                            <div class="player-stats">
                                <span class="player-fitness">Forma: ${Math.round(o.fitness)}%</span>
                                <span class="player-morale">Morale: ${Math.round(o.morale)}%</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `).join("");document.getElementById("playerSelectionGrid").innerHTML=s,this.populateSetPieceSelectors(t)}populateSetPieceSelectors(e){["captain","penaltyTaker","freeKickTaker","cornerTaker"].forEach(a=>{const s=document.getElementById(`${a}Select`);s&&(s.innerHTML='<option value="">Seleziona...</option>'+e.map(n=>`
                        <option value="${n.id}">
                            ${n.first_name} ${n.last_name} (${n.position})
                        </option>
                    `).join(""))})}getPositionName(e){return{GK:"Portieri",DEF:"Difensori",MID:"Centrocampisti",ATT:"Attaccanti"}[e]||e}showPlayerSelector(e){const t=this.playerPositions[e],n=this.gameManager.getUserPlayers().filter(o=>o.injury_status==="healthy"&&(o.position===t.position||this.isCompatiblePosition(o.position,t.position))).map(o=>`
            <div class="player-option" data-player-id="${o.id}" tabindex="0">
                <div class="player-info">
                    <span class="player-name">${o.first_name} ${o.last_name}</span>
                    <span class="player-rating">${o.overall_rating}</span>
                </div>
                <div class="player-details">
                    <span class="player-position">${o.position}</span>
                    <span class="player-fitness">Forma: ${Math.round(o.fitness)}%</span>
                </div>
            </div>
        `).join(""),i=`
            <div class="player-selector">
                <h4>Seleziona giocatore per ${t.position}</h4>
                <div class="player-options">
                    ${n}
                </div>
            </div>
        `;window.boltManager.uiManager.showModal("Selezione Giocatore",i),document.querySelectorAll(".player-option").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.playerId;this.assignPlayerToPosition(e,r),window.boltManager.uiManager.hideModal()}),o.addEventListener("keydown",r=>{if(r.key==="Enter"||r.key===" "){r.preventDefault();const l=o.dataset.playerId;this.assignPlayerToPosition(e,l),window.boltManager.uiManager.hideModal()}})})}isCompatiblePosition(e,t){var s;return((s={GK:["GK"],DEF:["DEF"],MID:["MID","DEF","ATT"],ATT:["ATT","MID"]}[e])==null?void 0:s.includes(t))||!1}assignPlayerToPosition(e,t){const a=this.gameManager.gameData.players.find(n=>n.id===t);if(!a)return;Object.keys(this.selectedPlayers).forEach(n=>{if(this.selectedPlayers[n]===t){delete this.selectedPlayers[n];const i=document.getElementById(`playerSlot${n}`);i&&(i.innerHTML='<span class="player-name">Seleziona</span>')}}),this.selectedPlayers[e]=t;const s=document.getElementById(`playerSlot${e}`);s&&(s.innerHTML=`
                <span class="player-name">${a.first_name} ${a.last_name}</span>
                <span class="player-rating">${a.overall_rating}</span>
            `),this.updateTacticalEffectiveness()}updateTacticalEffectiveness(){let e=50;e+=10;const t=Object.keys(this.selectedPlayers).length;e+=t/11*20,this.currentMentality==="attacking"&&this.currentTempo==="fast"&&(e+=5),this.currentMentality==="defensive"&&this.currentPressing==="low"&&(e+=5),e=Math.min(100,Math.max(0,e)),document.getElementById("effectivenessValue").textContent=`${Math.round(e)}%`;const a=document.getElementById("effectivenessProgress");a&&(a.style.width=`${e}%`,a.style.backgroundColor=this.getEffectivenessColor(e))}getEffectivenessColor(e){return e>=80?"var(--success)":e>=60?"var(--warning)":"var(--error)"}async saveTactics(){var e,t,a,s;try{const n=this.gameManager.getUserTeam();if(!n)throw new Error("Squadra utente non trovata");if(Object.keys(this.selectedPlayers).length<11){window.boltManager.uiManager.showToast("Seleziona tutti i giocatori prima di salvare","warning");return}window.boltManager.uiManager.showLoading("Salvataggio tattica...");const i=this.playerPositions.map((g,p)=>({playerId:this.selectedPlayers[p]||null,x:g.x,y:g.y,fieldPosition:g.position})),o=this.playerPositions.map((g,p)=>{const m=this.gameManager.gameData.players.find(v=>v.id===this.selectedPlayers[p]);return this.getDefaultRole(g.position,m==null?void 0:m.position)}),r=((e=document.getElementById("captainSelect"))==null?void 0:e.value)||null,l=((t=document.getElementById("penaltyTakerSelect"))==null?void 0:t.value)||null,d=((a=document.getElementById("freeKickTakerSelect"))==null?void 0:a.value)||null,c=((s=document.getElementById("cornerTakerSelect"))==null?void 0:s.value)||null,u=await this.gameManager.updateTactics({teamId:n.id,formation:this.currentFormation,mentality:this.currentMentality,tempo:this.currentTempo,width:this.currentWidth,pressing:this.currentPressing,defensiveLine:this.currentDefensiveLine,passingStyle:this.currentPassingStyle,crossing:this.currentCrossing,playerPositions:i,playerRoles:o,setPieces:[],captainId:r,penaltyTakerId:l,freeKickTakerId:d,cornerTakerId:c,tacticName:"Tattica Principale"});window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Tattica salvata con successo!","success"),this.updateTacticalEffectiveness()}catch(n){console.error("Error saving tactics:",n),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nel salvataggio: "+n.message,"error")}}getDefaultRole(e,t){return{GK:"goalkeeper",DEF:"defender",MID:"midfielder",ATT:"forward"}[e]||"midfielder"}resetTactics(){this.currentFormation="4-4-2",this.currentMentality="balanced",this.currentTempo="normal",this.currentWidth="normal",this.currentPressing="medium",this.currentDefensiveLine="normal",this.currentPassingStyle="mixed",this.currentCrossing="normal",this.selectedPlayers={},document.getElementById("formationSelect").value=this.currentFormation,document.getElementById("mentalitySelect").value=this.currentMentality,document.getElementById("tempoSelect").value=this.currentTempo,document.getElementById("widthSelect").value=this.currentWidth,document.getElementById("pressingSelect").value=this.currentPressing,document.getElementById("defensiveLineSelect").value=this.currentDefensiveLine,document.getElementById("passingStyleSelect").value=this.currentPassingStyle,this.loadTacticalField(),this.updateTacticalEffectiveness(),window.boltManager.uiManager.showToast("Tattica ripristinata","info")}previewTactics(){const e=document.getElementById("effectivenessValue").textContent,t=Object.keys(this.selectedPlayers).length,a=`
            <div class="tactics-preview">
                <h4>Anteprima Tattica</h4>
                <div class="preview-stats">
                    <div class="stat-item">
                        <span class="stat-label">Modulo:</span>
                        <span class="stat-value">${this.currentFormation}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Mentalità:</span>
                        <span class="stat-value">${this.currentMentality}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Efficacia:</span>
                        <span class="stat-value">${e}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Giocatori Assegnati:</span>
                        <span class="stat-value">${t}/11</span>
                    </div>
                </div>
                <div class="preview-recommendations">
                    <h5>Raccomandazioni:</h5>
                    <ul>
                        ${t<11?"<li>Completa la selezione dei giocatori</li>":""}
                        ${this.currentMentality==="attacking"&&this.currentPressing==="low"?"<li>Considera un pressing più alto per una mentalità offensiva</li>":""}
                        ${this.currentMentality==="defensive"&&this.currentTempo==="fast"?"<li>Un ritmo più lento potrebbe essere più adatto alla mentalità difensiva</li>":""}
                    </ul>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal("Anteprima Tattica",a)}}class B{constructor(){this.gameManager=null,this.currentMatch=null,this.simulationSpeed="normal",this.isSimulating=!1,this.matchEvents=[],this.currentMinute=0}async init(){var e;if(console.log("⚽ Initializing MatchSimulationPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadMatchData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb" aria-label="Navigazione">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator" aria-hidden="true">></span>
                    <span class="breadcrumb-current">Partita</span>
                </nav>

                <!-- Match Header -->
                <div id="matchHeader" class="match-header">
                    <!-- Will be populated by loadMatchData() -->
                </div>

                <!-- Live Score -->
                <div id="liveScore" class="live-score" aria-live="polite">
                    <div class="score-display" aria-label="Punteggio attuale">
                        <span id="homeScore" class="home-score">0</span>
                        <span class="score-separator" aria-hidden="true">-</span>
                        <span id="awayScore" class="away-score">0</span>
                    </div>
                    <div id="matchTime" class="match-time" aria-label="Minuto di gioco">0'</div>
                    <div id="matchStatus" class="match-status" aria-label="Stato partita">Pre-Partita</div>
                </div>

                <!-- Match Controls -->
                <div class="match-controls" aria-label="Controlli partita">
                    <button id="startMatchBtn" class="button button-primary button-large" aria-label="Inizia partita">
                        ▶️ Inizia Partita
                    </button>
                    <button id="pauseMatchBtn" class="button button-secondary" style="display: none;" aria-label="Pausa partita">
                        ⏸️ Pausa
                    </button>
                    <button id="resumeMatchBtn" class="button button-secondary" style="display: none;" aria-label="Riprendi partita">
                        ▶️ Riprendi
                    </button>
                    
                    <div class="speed-controls">
                        <label for="speedSelect">Velocità:</label>
                        <select id="speedSelect" aria-label="Seleziona velocità simulazione">
                            <option value="slow">Lenta</option>
                            <option value="normal" selected>Normale</option>
                            <option value="fast">Veloce</option>
                            <option value="instant">Istantanea</option>
                        </select>
                    </div>
                </div>

                <!-- Sponsor Vertical -->
                <div class="sponsor-slot sponsor-vertical" aria-label="Sponsor">
                    <span class="sponsor-label">Partner Stadio</span>
                    <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=200&h=400&fit=crop" 
                         alt="Sponsor Stadium" class="sponsor-image">
                </div>

                <!-- Match Content -->
                <div class="match-content">
                    <!-- Live Events -->
                    <div class="match-events-section">
                        <h3>Eventi Live</h3>
                        <div id="liveEvents" class="live-events" aria-live="polite">
                            <div class="no-events">La partita non è ancora iniziata</div>
                        </div>
                    </div>

                    <!-- Live Stats -->
                    <div class="live-stats-section">
                        <h3>Statistiche Live</h3>
                        <div id="liveStats" class="live-stats" aria-label="Statistiche partita">
                            <!-- Will be populated during simulation -->
                        </div>
                    </div>
                </div>

                <!-- Sponsor Banner -->
                <div class="sponsor-slot sponsor-banner" aria-label="Sponsor">
                    <span class="sponsor-label">Sponsor Ufficiale</span>
                    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                         alt="Sponsor Banner" class="sponsor-image">
                </div>

                <!-- Lineups -->
                <div class="lineups-section">
                    <h3>Formazioni</h3>
                    <div class="lineups-container">
                        <div id="homeLineup" class="lineup home-lineup">
                            <!-- Will be populated by loadLineups() -->
                        </div>
                        <div id="awayLineup" class="lineup away-lineup">
                            <!-- Will be populated by loadLineups() -->
                        </div>
                    </div>
                </div>

                <!-- Substitutions Panel -->
                <div id="substitutionsPanel" class="substitutions-panel" style="display: none;">
                    <h3>Sostituzioni</h3>
                    <div class="substitutions-content">
                        <!-- Will be populated during match -->
                    </div>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s;(e=document.getElementById("startMatchBtn"))==null||e.addEventListener("click",()=>{this.startMatch()}),(t=document.getElementById("pauseMatchBtn"))==null||t.addEventListener("click",()=>{this.pauseMatch()}),(a=document.getElementById("resumeMatchBtn"))==null||a.addEventListener("click",()=>{this.resumeMatch()}),(s=document.getElementById("speedSelect"))==null||s.addEventListener("change",n=>{this.simulationSpeed=n.target.value})}loadMatchData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available");return}const e=this.gameManager.getUserTeam();if(!e)return;const t=this.gameManager.getUpcomingMatches(e.id,1);if(t.length===0){this.showNoMatchesAvailable();return}this.currentMatch=t[0],this.loadMatchHeader(),this.loadLineups(),this.initializeLiveStats()}loadMatchHeader(){if(!this.currentMatch)return;const e=this.gameManager.gameData.teams.find(n=>n.id===this.currentMatch.home_team_id),t=this.gameManager.gameData.teams.find(n=>n.id===this.currentMatch.away_team_id),a=new Date(this.currentMatch.match_date),s=`
            <div class="match-teams">
                <div class="team home-team">
                    <div class="team-info">
                        <h2 class="team-name">${(e==null?void 0:e.name)||"Home Team"}</h2>
                        <span class="team-city">${(e==null?void 0:e.city)||""}</span>
                    </div>
                    <div class="team-form">
                        <span class="form-label">Forma:</span>
                        <span class="form-value">${(e==null?void 0:e.formation)||"4-4-2"}</span>
                    </div>
                </div>
                
                <div class="match-info">
                    <div class="match-details">
                        <span class="match-date">${a.toLocaleDateString("it-IT")}</span>
                        <span class="match-time">${a.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</span>
                        <span class="match-day">Giornata ${this.currentMatch.matchday}</span>
                    </div>
                    <div class="match-venue">
                        <span class="venue-name">Stadio ${(e==null?void 0:e.city)||"Casa"}</span>
                    </div>
                </div>
                
                <div class="team away-team">
                    <div class="team-info">
                        <h2 class="team-name">${(t==null?void 0:t.name)||"Away Team"}</h2>
                        <span class="team-city">${(t==null?void 0:t.city)||""}</span>
                    </div>
                    <div class="team-form">
                        <span class="form-label">Forma:</span>
                        <span class="form-value">${(t==null?void 0:t.formation)||"4-4-2"}</span>
                    </div>
                </div>
            </div>
        `;document.getElementById("matchHeader").innerHTML=s}loadLineups(){if(!this.currentMatch)return;const e=this.gameManager.getPlayersByTeam(this.currentMatch.home_team_id).filter(n=>n.injury_status==="healthy").sort((n,i)=>i.overall_rating-n.overall_rating).slice(0,11),t=this.gameManager.getPlayersByTeam(this.currentMatch.away_team_id).filter(n=>n.injury_status==="healthy").sort((n,i)=>i.overall_rating-n.overall_rating).slice(0,11),a=`
            <h4>Formazione Casa</h4>
            <div class="lineup-players">
                ${e.map(n=>`
                    <div class="lineup-player">
                        <span class="player-position">${n.position}</span>
                        <span class="player-name">${n.first_name} ${n.last_name}</span>
                        <span class="player-rating">${n.overall_rating}</span>
                    </div>
                `).join("")}
            </div>
        `,s=`
            <h4>Formazione Ospite</h4>
            <div class="lineup-players">
                ${t.map(n=>`
                    <div class="lineup-player">
                        <span class="player-position">${n.position}</span>
                        <span class="player-name">${n.first_name} ${n.last_name}</span>
                        <span class="player-rating">${n.overall_rating}</span>
                    </div>
                `).join("")}
            </div>
        `;document.getElementById("homeLineup").innerHTML=a,document.getElementById("awayLineup").innerHTML=s}initializeLiveStats(){const e=`
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-label">Possesso</span>
                    <div class="stat-bar">
                        <div class="stat-home" style="width: 50%">50%</div>
                        <div class="stat-away" style="width: 50%">50%</div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Tiri</span>
                    
                    <div class="stat-values">
                        <span id="homeShotsCount">0</span>
                        <span class="stat-separator">-</span>
                        <span id="awayShotsCount">0</span>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Tiri in Porta</span>
                    <div class="stat-values">
                        <span id="homeShotsOnTargetCount">0</span>
                        <span class="stat-separator">-</span>
                        <span id="awayShotsOnTargetCount">0</span>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Corner</span>
                    <div class="stat-values">
                        <span id="homeCornersCount">0</span>
                        <span class="stat-separator">-</span>
                        <span id="awayCornersCount">0</span>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Falli</span>
                    <div class="stat-values">
                        <span id="homeFoulsCount">0</span>
                        <span class="stat-separator">-</span>
                        <span id="awayFoulsCount">0</span>
                    </div>
                </div>
            </div>
        `;document.getElementById("liveStats").innerHTML=e}async startMatch(){if(!this.currentMatch){window.boltManager.uiManager.showToast("Nessuna partita disponibile","warning");return}try{this.isSimulating=!0,document.getElementById("startMatchBtn").style.display="none",document.getElementById("pauseMatchBtn").style.display="inline-block",document.getElementById("matchStatus").textContent="In Corso",this.matchEvents=[],this.currentMinute=0,document.getElementById("liveEvents").innerHTML="",window.boltManager.uiManager.showToast("Partita iniziata!","success"),this.simulationSpeed==="instant"?await this.simulateInstantMatch():await this.simulateLiveMatch()}catch(e){console.error("Error starting match:",e),window.boltManager.uiManager.showToast("Errore nell'avvio della partita: "+e.message,"error"),this.isSimulating=!1}}async simulateInstantMatch(){window.boltManager.uiManager.showLoading("Simulazione partita in corso...");try{const e=await this.gameManager.simulateMatch(this.currentMatch.id);this.updateFinalScore(e.match.home_goals,e.match.away_goals),this.displayMatchEvents(e.events),this.updateLiveStats(e.stats),document.getElementById("matchStatus").textContent="Terminata",document.getElementById("matchTime").textContent="90'",window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Partita completata!","success"),setTimeout(()=>{this.showMatchAnalysisOption(e.match.id)},2e3)}catch(e){throw window.boltManager.uiManager.hideLoading(),e}}async simulateLiveMatch(){const t={slow:2e3,normal:1e3,fast:500}[this.simulationSpeed]||1e3;for(let a=1;a<=90&&this.isSimulating;a++){if(this.currentMinute=a,document.getElementById("matchTime").textContent=`${a}'`,Math.random()<.1){const s=this.generateRandomEvent(a);s&&this.addLiveEvent(s)}await new Promise(s=>setTimeout(s,t))}this.isSimulating&&await this.completeMatch()}generateRandomEvent(e){const t=["shot","corner","foul","goal","yellow_card"],a=t[Math.floor(Math.random()*t.length)],s=Math.random()<.5,n=s?this.gameManager.getPlayersByTeam(this.currentMatch.home_team_id):this.gameManager.getPlayersByTeam(this.currentMatch.away_team_id),i=n[Math.floor(Math.random()*n.length)];switch(a){case"goal":if(Math.random()<.05)return this.updateScore(s),{minute:e,type:"goal",team:s?"home":"away",description:`⚽ Gol di ${i.first_name} ${i.last_name}!`,importance:"high"};break;case"shot":return this.updateShotStats(s),{minute:e,type:"shot",team:s?"home":"away",description:`🎯 Tiro di ${i.first_name} ${i.last_name}`,importance:"medium"};case"corner":return this.updateCornerStats(s),{minute:e,type:"corner",team:s?"home":"away",description:`📐 Calcio d'angolo per ${s?"casa":"ospiti"}`,importance:"low"};case"foul":return this.updateFoulStats(s),{minute:e,type:"foul",team:s?"home":"away",description:`⚠️ Fallo di ${i.first_name} ${i.last_name}`,importance:"low"};case"yellow_card":if(Math.random()<.03)return{minute:e,type:"yellow_card",team:s?"home":"away",description:`🟨 Cartellino giallo per ${i.first_name} ${i.last_name}`,importance:"medium"};break}return null}addLiveEvent(e){this.matchEvents.push(e);const t=document.createElement("div");t.className=`live-event ${e.importance}`,t.setAttribute("aria-live","polite"),t.innerHTML=`
            <span class="event-minute">${e.minute}'</span>
            <span class="event-description">${e.description}</span>
        `;const a=document.getElementById("liveEvents");a.insertBefore(t,a.firstChild),setTimeout(()=>{t.classList.add("event-show")},10)}updateScore(e){const t=document.getElementById(e?"homeScore":"awayScore"),a=parseInt(t.textContent);t.textContent=a+1}updateShotStats(e){const t=document.getElementById(e?"homeShotsCount":"awayShotsCount"),a=parseInt(t.textContent);t.textContent=a+1}updateCornerStats(e){const t=document.getElementById(e?"homeCornersCount":"awayCornersCount"),a=parseInt(t.textContent);t.textContent=a+1}updateFoulStats(e){const t=document.getElementById(e?"homeFoulsCount":"awayFoulsCount"),a=parseInt(t.textContent);t.textContent=a+1}async completeMatch(){try{const e=await this.gameManager.simulateMatch(this.currentMatch.id);this.updateFinalScore(e.match.home_goals,e.match.away_goals),document.getElementById("matchStatus").textContent="Terminata",document.getElementById("pauseMatchBtn").style.display="none",window.boltManager.uiManager.showToast("Partita terminata!","success"),setTimeout(()=>{this.showMatchAnalysisOption(e.match.id)},2e3)}catch(e){console.error("Error completing match:",e),window.boltManager.uiManager.showToast("Errore nel completamento della partita","error")}}updateFinalScore(e,t){document.getElementById("homeScore").textContent=e,document.getElementById("awayScore").textContent=t}displayMatchEvents(e){const t=document.getElementById("liveEvents");t.innerHTML="",e.forEach(a=>{const s=document.createElement("div");s.className=`live-event ${a.type==="goal"?"high":"medium"}`,s.innerHTML=`
                <span class="event-minute">${a.minute}'</span>
                <span class="event-description">${a.description}</span>
            `,t.appendChild(s)})}updateLiveStats(e){const t=e.home_possession,a=e.away_possession;document.querySelector(".stat-home").style.width=`${t}%`,document.querySelector(".stat-home").textContent=`${t}%`,document.querySelector(".stat-away").style.width=`${a}%`,document.querySelector(".stat-away").textContent=`${a}%`,document.getElementById("homeShotsCount").textContent=e.home_shots,document.getElementById("awayShotsCount").textContent=e.away_shots,document.getElementById("homeShotsOnTargetCount").textContent=e.home_shots_on_target,document.getElementById("awayShotsOnTargetCount").textContent=e.away_shots_on_target,document.getElementById("homeCornersCount").textContent=e.home_corners,document.getElementById("awayCornersCount").textContent=e.away_corners,document.getElementById("homeFoulsCount").textContent=e.home_fouls,document.getElementById("awayFoulsCount").textContent=e.away_fouls}pauseMatch(){this.isSimulating=!1,document.getElementById("pauseMatchBtn").style.display="none",document.getElementById("resumeMatchBtn").style.display="inline-block",document.getElementById("matchStatus").textContent="In Pausa",window.boltManager.uiManager.showToast("Partita in pausa","info")}resumeMatch(){this.isSimulating=!0,document.getElementById("resumeMatchBtn").style.display="none",document.getElementById("pauseMatchBtn").style.display="inline-block",document.getElementById("matchStatus").textContent="In Corso",window.boltManager.uiManager.showToast("Partita ripresa","info"),this.simulateLiveMatch()}showMatchAnalysisOption(e){window.boltManager.uiManager.showModal("Partita Completata",`
            <div class="match-completed">
                <h4>Partita Completata!</h4>
                <p>La partita è terminata. Vuoi visualizzare l'analisi dettagliata?</p>
                <div class="completion-actions">
                    <button class="button button-primary" onclick="window.boltManager.navigateToPage('match-analysis')">
                        📊 Visualizza Analisi
                    </button>
                    <button class="button button-secondary" onclick="window.boltManager.uiManager.hideModal()">
                        ✅ Continua
                    </button>
                </div>
            </div>
        `)}showNoMatchesAvailable(){const e=`
            <div class="no-matches">
                <h3>Nessuna Partita Disponibile</h3>
                <p>Non ci sono partite programmate al momento.</p>
                <p>Controlla il calendario per vedere le prossime partite o avanza nel tempo.</p>
                <button class="button button-primary" onclick="window.boltManager.navigateToPage('calendar')">
                    📅 Vai al Calendario
                </button>
            </div>
        `;document.getElementById("matchHeader").innerHTML=e,document.querySelector(".live-score").style.display="none",document.querySelector(".match-controls").style.display="none",document.querySelector(".match-content").style.display="none",document.querySelector(".lineups-section").style.display="none"}}class A{constructor(){this.gameManager=null,this.currentMatch=null,this.matchReport=null}async init(){var e;if(console.log("📊 Initializing MatchAnalysisPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadAnalysisData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Analisi Partita</span>
                </nav>

                <!-- Match Summary -->
                <div id="matchSummary" class="match-summary">
                    <!-- Will be populated by loadMatchSummary() -->
                </div>

                <!-- Statistics Comparison -->
                <div class="statistics-section">
                    <h3>Statistiche Comparative</h3>
                    <div id="statisticsComparison" class="statistics-comparison">
                        <!-- Will be populated by loadStatisticsComparison() -->
                    </div>
                </div>

                <!-- Player Ratings -->
                <div class="player-ratings-section">
                    <h3>Valutazioni Giocatori</h3>
                    <div id="playerRatings" class="player-ratings">
                        <!-- Will be populated by loadPlayerRatings() -->
                    </div>
                </div>

                <!-- Sponsor Footer -->
                <div class="sponsor-footer">
                    <div class="sponsor-content">
                        <span class="sponsor-label">Analisi powered by</span>
                        <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=50&fit=crop" 
                             alt="Sponsor Analysis" class="sponsor-image">
                    </div>
                </div>

                <!-- Key Moments -->
                <div class="key-moments-section">
                    <h3>Momenti Salienti</h3>
                    <div id="keyMomentsTimeline" class="key-moments-timeline">
                        <!-- Will be populated by loadKeyMoments() -->
                    </div>
                </div>

                <!-- Tactical Analysis -->
                <div class="tactical-analysis-section">
                    <h3>Analisi Tattica</h3>
                    <div id="tacticalAnalysis" class="tactical-analysis">
                        <!-- Will be populated by loadTacticalAnalysis() -->
                    </div>
                </div>

                <!-- Match Details -->
                <div class="match-details-section">
                    <h3>Dettagli Partita</h3>
                    <div id="matchDetails" class="match-details">
                        <!-- Will be populated by loadMatchDetails() -->
                    </div>
                </div>

                <!-- Actions -->
                <div class="analysis-actions">
                    <button id="exportReportBtn" class="button button-primary">
                        📄 Esporta Report
                    </button>
                    <button id="shareAnalysisBtn" class="button button-secondary">
                        📤 Condividi
                    </button>
                    <button id="backToMatchesBtn" class="button button-ghost">
                        ← Torna alle Partite
                    </button>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a;(e=document.getElementById("exportReportBtn"))==null||e.addEventListener("click",()=>{this.exportReport()}),(t=document.getElementById("shareAnalysisBtn"))==null||t.addEventListener("click",()=>{this.shareAnalysis()}),(a=document.getElementById("backToMatchesBtn"))==null||a.addEventListener("click",()=>{window.boltManager.navigateToPage("calendar")})}loadAnalysisData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available");return}const e=this.gameManager.getUserTeam();if(!e)return;const t=this.gameManager.getRecentMatches(e.id,1);if(t.length===0){this.showNoMatchesAvailable();return}if(this.currentMatch=t[0],this.matchReport=this.gameManager.getMatchReport(this.currentMatch.id),!this.matchReport){this.showNoReportAvailable();return}this.loadMatchSummary(),this.loadStatisticsComparison(),this.loadPlayerRatings(),this.loadKeyMoments(),this.loadTacticalAnalysis(),this.loadMatchDetails()}loadMatchSummary(){var r;if(!this.currentMatch||!this.matchReport)return;const e=this.gameManager.gameData.teams.find(l=>l.id===this.currentMatch.home_team_id),t=this.gameManager.gameData.teams.find(l=>l.id===this.currentMatch.away_team_id),a=new Date(this.currentMatch.match_date),s=this.currentMatch.home_goals>this.currentMatch.away_goals,n=this.currentMatch.away_goals>this.currentMatch.home_goals;this.currentMatch.home_goals,this.currentMatch.away_goals;const o=`
            <div class="match-summary-card ${s?"home-win":n?"away-win":"draw"}">
                <div class="match-header">
                    <div class="match-date">
                        ${a.toLocaleDateString("it-IT",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
                    </div>
                    <div class="match-venue">
                        Stadio ${(e==null?void 0:e.city)||"Casa"} - ${((r=this.currentMatch.attendance)==null?void 0:r.toLocaleString())||"N/A"} spettatori
                    </div>
                </div>

                <div class="match-result">
                    <div class="team-result home-team">
                        <h2 class="team-name">${(e==null?void 0:e.name)||"Home"}</h2>
                        <div class="team-score">${this.currentMatch.home_goals}</div>
                    </div>
                    
                    <div class="result-separator">
                        <div class="score-separator">-</div>
                        <div class="result-status">
                            ${s?"Vittoria Casa":n?"Vittoria Ospiti":"Pareggio"}
                        </div>
                    </div>
                    
                    <div class="team-result away-team">
                        <h2 class="team-name">${(t==null?void 0:t.name)||"Away"}</h2>
                        <div class="team-score">${this.currentMatch.away_goals}</div>
                    </div>
                </div>

                <div class="match-info">
                    <div class="info-item">
                        <span class="info-label">Formazioni:</span>
                        <span class="info-value">${this.currentMatch.home_formation||"4-4-2"} vs ${this.currentMatch.away_formation||"4-4-2"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Condizioni:</span>
                        <span class="info-value">${this.getWeatherDescription(this.currentMatch.weather)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Arbitro:</span>
                        <span class="info-value">${this.currentMatch.referee||"N/A"}</span>
                    </div>
                </div>

                ${this.matchReport.man_of_the_match?`
                    <div class="man-of-match">
                        <span class="motm-label">🏆 Migliore in campo:</span>
                        <span class="motm-name">${this.getPlayerName(this.matchReport.man_of_the_match)}</span>
                    </div>
                `:""}
            </div>
        `;document.getElementById("matchSummary").innerHTML=o}loadStatisticsComparison(){if(!this.matchReport)return;const t=[{label:"Possesso Palla",home:this.matchReport.home_possession,away:this.matchReport.away_possession,unit:"%"},{label:"Tiri Totali",home:this.matchReport.home_shots,away:this.matchReport.away_shots,unit:""},{label:"Tiri in Porta",home:this.matchReport.home_shots_on_target,away:this.matchReport.away_shots_on_target,unit:""},{label:"Calci d'Angolo",home:this.matchReport.home_corners,away:this.matchReport.away_corners,unit:""},{label:"Falli Commessi",home:this.matchReport.home_fouls,away:this.matchReport.away_fouls,unit:""},{label:"Cartellini Gialli",home:this.matchReport.home_yellow_cards,away:this.matchReport.away_yellow_cards,unit:""},{label:"Cartellini Rossi",home:this.matchReport.home_red_cards,away:this.matchReport.away_red_cards,unit:""},{label:"Passaggi",home:this.matchReport.home_passes,away:this.matchReport.away_passes,unit:""},{label:"Precisione Passaggi",home:this.matchReport.home_pass_accuracy,away:this.matchReport.away_pass_accuracy,unit:"%"}].map(a=>{const s=a.home+a.away>0?a.home/(a.home+a.away)*100:50,n=100-s;return`
                <div class="stat-comparison">
                    <div class="stat-label">${a.label}</div>
                    <div class="stat-bar">
                        <div class="stat-home-value">${a.home}${a.unit}</div>
                        <div class="stat-bar-container">
                            <div class="stat-bar-home" style="width: ${s}%"></div>
                            <div class="stat-bar-away" style="width: ${n}%"></div>
                        </div>
                        <div class="stat-away-value">${a.away}${a.unit}</div>
                    </div>
                </div>
            `}).join("");document.getElementById("statisticsComparison").innerHTML=t}loadPlayerRatings(){if(!this.matchReport||!this.matchReport.player_ratings)return;const e=[],t=[];this.matchReport.player_ratings.forEach(s=>{const n=this.gameManager.gameData.players.find(i=>i.id===s.player_id);if(n){const i={...s,team_id:n.team_id};n.team_id===this.currentMatch.home_team_id?e.push(i):t.push(i)}}),e.sort((s,n)=>n.rating-s.rating),t.sort((s,n)=>n.rating-s.rating);const a=`
            <div class="ratings-container">
                <div class="team-ratings home-ratings">
                    <h4>Squadra Casa</h4>
                    <div class="ratings-list">
                        ${e.map(s=>`
                            <div class="player-rating-item ${s.player_id===this.matchReport.man_of_the_match?"man-of-match":""}">
                                <div class="player-info">
                                    <span class="player-name">${s.player_name}</span>
                                    <span class="player-position">${s.position}</span>
                                </div>
                                <div class="rating-display">
                                    <span class="rating-value ${this.getRatingClass(s.rating)}">${s.rating}</span>
                                    <div class="rating-bar">
                                        <div class="rating-fill" style="width: ${s.rating/10*100}%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <div class="team-ratings away-ratings">
                    <h4>Squadra Ospite</h4>
                    <div class="ratings-list">
                        ${t.map(s=>`
                            <div class="player-rating-item ${s.player_id===this.matchReport.man_of_the_match?"man-of-match":""}">
                                <div class="player-info">
                                    <span class="player-name">${s.player_name}</span>
                                    <span class="player-position">${s.position}</span>
                                </div>
                                <div class="rating-display">
                                    <span class="rating-value ${this.getRatingClass(s.rating)}">${s.rating}</span>
                                    <div class="rating-bar">
                                        <div class="rating-fill" style="width: ${s.rating/10*100}%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;document.getElementById("playerRatings").innerHTML=a}loadKeyMoments(){if(!this.matchReport||!this.matchReport.key_moments)return;if(this.matchReport.key_moments.length===0){document.getElementById("keyMomentsTimeline").innerHTML=`
                <div class="no-key-moments">
                    <p>Nessun momento saliente particolare in questa partita</p>
                </div>
            `;return}const e=this.matchReport.key_moments.map(t=>`
            <div class="key-moment ${t.importance}">
                <div class="moment-time">${t.minute}'</div>
                <div class="moment-content">
                    <div class="moment-type">${this.getMomentIcon(t.type)}</div>
                    <div class="moment-description">${t.description}</div>
                </div>
            </div>
        `).join("");document.getElementById("keyMomentsTimeline").innerHTML=`
            <div class="timeline">
                ${e}
            </div>
        `}loadTacticalAnalysis(){if(!this.matchReport)return;const e=`
            <div class="tactical-analysis-content">
                <div class="analysis-text">
                    <p>${this.matchReport.tactical_analysis||"Analisi tattica non disponibile."}</p>
                </div>
                
                <div class="analysis-details">
                    <div class="detail-item">
                        <span class="detail-label">Impatto Meteo:</span>
                        <span class="detail-value">${this.matchReport.weather_impact||"Nessun impatto particolare"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Prestazione Arbitro:</span>
                        <span class="detail-value">${this.matchReport.referee_performance||"N/A"}/10</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Impatto Pubblico:</span>
                        <span class="detail-value">${this.matchReport.attendance_impact||"Neutrale"}</span>
                    </div>
                </div>
            </div>
        `;document.getElementById("tacticalAnalysis").innerHTML=e}loadMatchDetails(){var t,a;if(!this.matchReport)return;const e=`
            <div class="match-details-grid">
                <div class="detail-section">
                    <h4>Tempi di Recupero</h4>
                    <div class="detail-item">
                        <span class="detail-label">Primo Tempo:</span>
                        <span class="detail-value">${this.matchReport.injury_time_home||0} minuti</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Secondo Tempo:</span>
                        <span class="detail-value">${this.matchReport.injury_time_away||0} minuti</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Informazioni Partita</h4>
                    <div class="detail-item">
                        <span class="detail-label">Data:</span>
                        <span class="detail-value">${new Date(this.currentMatch.match_date).toLocaleDateString("it-IT")}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Giornata:</span>
                        <span class="detail-value">${this.currentMatch.matchday}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Spettatori:</span>
                        <span class="detail-value">${((t=this.currentMatch.attendance)==null?void 0:t.toLocaleString())||"N/A"}</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Eventi Partita</h4>
                    <div class="detail-item">
                        <span class="detail-label">Totale Eventi:</span>
                        <span class="detail-value">${((a=this.matchReport.match_events)==null?void 0:a.length)||0}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Gol Totali:</span>
                        <span class="detail-value">${this.currentMatch.home_goals+this.currentMatch.away_goals}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Cartellini:</span>
                        <span class="detail-value">
                            🟨 ${this.matchReport.home_yellow_cards+this.matchReport.away_yellow_cards}
                            🟥 ${this.matchReport.home_red_cards+this.matchReport.away_red_cards}
                        </span>
                    </div>
                </div>
            </div>
        `;document.getElementById("matchDetails").innerHTML=e}getWeatherDescription(e){return{sunny:"☀️ Soleggiato",cloudy:"☁️ Nuvoloso",rainy:"🌧️ Piovoso"}[e]||"🌤️ Condizioni normali"}getPlayerName(e){const t=this.gameManager.gameData.players.find(a=>a.id===e);return t?`${t.first_name} ${t.last_name}`:"Sconosciuto"}getRatingClass(e){return e>=8?"excellent":e>=7?"good":e>=6?"average":e>=5?"poor":"terrible"}getMomentIcon(e){return{goal:"⚽",red_card:"🟥",yellow_card:"🟨",substitution:"🔄",penalty:"🥅"}[e]||"⚡"}exportReport(){const e=this.gameManager.gameData.teams.find(o=>o.id===this.currentMatch.home_team_id),t=this.gameManager.gameData.teams.find(o=>o.id===this.currentMatch.away_team_id),a=`
REPORT PARTITA - ${new Date(this.currentMatch.match_date).toLocaleDateString("it-IT")}

${(e==null?void 0:e.name)||"Casa"} ${this.currentMatch.home_goals} - ${this.currentMatch.away_goals} ${(t==null?void 0:t.name)||"Ospiti"}

STATISTICHE:
- Possesso: ${this.matchReport.home_possession}% - ${this.matchReport.away_possession}%
- Tiri: ${this.matchReport.home_shots} - ${this.matchReport.away_shots}
- Tiri in porta: ${this.matchReport.home_shots_on_target} - ${this.matchReport.away_shots_on_target}

ANALISI TATTICA:
${this.matchReport.tactical_analysis||"Non disponibile"}

Generato da Bolt Manager 01/02
        `,s=new Blob([a],{type:"text/plain"}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download=`report_${(e==null?void 0:e.short_name)||"HOME"}_vs_${(t==null?void 0:t.short_name)||"AWAY"}.txt`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(n),window.boltManager.uiManager.showToast("Report esportato con successo!","success")}shareAnalysis(){const e=this.gameManager.gameData.teams.find(s=>s.id===this.currentMatch.home_team_id),t=this.gameManager.gameData.teams.find(s=>s.id===this.currentMatch.away_team_id),a=`🏆 ${(e==null?void 0:e.name)||"Casa"} ${this.currentMatch.home_goals} - ${this.currentMatch.away_goals} ${(t==null?void 0:t.name)||"Ospiti"}

Partita simulata con Bolt Manager 01/02`;navigator.share?navigator.share({title:"Risultato Partita",text:a}):navigator.clipboard.writeText(a).then(()=>{window.boltManager.uiManager.showToast("Risultato copiato negli appunti!","success")})}showNoMatchesAvailable(){const e=`
            <div class="no-matches">
                <h3>Nessuna Partita da Analizzare</h3>
                <p>Non ci sono partite completate da analizzare.</p>
                <button class="button button-primary" onclick="window.boltManager.navigateToPage('calendar')">
                    📅 Vai al Calendario
                </button>
            </div>
        `;document.getElementById("matchSummary").innerHTML=e,document.querySelector(".statistics-section").style.display="none",document.querySelector(".player-ratings-section").style.display="none",document.querySelector(".key-moments-section").style.display="none",document.querySelector(".tactical-analysis-section").style.display="none",document.querySelector(".match-details-section").style.display="none"}showNoReportAvailable(){const e=`
            <div class="no-report">
                <h3>Report Non Disponibile</h3>
                <p>Il report dettagliato per questa partita non è disponibile.</p>
                <button class="button button-primary" onclick="window.boltManager.navigateToPage('calendar')">
                    📅 Torna al Calendario
                </button>
            </div>
        `;document.getElementById("matchSummary").innerHTML=e}}class R{constructor(){this.gameManager=null,this.savedSessions=[],this.selectedSession=null}async init(){var e;if(console.log("💾 Initializing SessionManagerPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadSessionData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Gestione Salvataggi</span>
                </nav>

                <!-- Quick Actions -->
                <div class="session-quick-actions">
                    <h2>Gestione Sessioni</h2>
                    <div class="quick-actions-bar">
                        <button id="newGameBtn" class="button button-primary">
                            🎮 Nuova Partita
                        </button>
                        <button id="quickSaveBtn" class="button button-secondary">
                            💾 Salvataggio Rapido
                        </button>
                        <button id="quickLoadBtn" class="button button-secondary">
                            📂 Caricamento Rapido
                        </button>
                    </div>
                </div>

                <!-- Save Slots Grid -->
                <div class="save-slots-section">
                    <h3>Slot di Salvataggio</h3>
                    <div id="saveSlotsGrid" class="save-slots-grid">
                        <!-- Will be populated by loadSaveSlots() -->
                    </div>
                </div>

                <!-- Sponsor Savebar -->
                <div class="sponsor-savebar">
                    <div class="sponsor-content">
                        <span class="sponsor-label">Salvataggi sicuri con</span>
                        <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=60&fit=crop" 
                             alt="Sponsor Save" class="sponsor-image">
                    </div>
                </div>

                <!-- Session Details Panel -->
                <div class="session-details-section">
                    <h3>Dettagli Sessione</h3>
                    <div id="sessionDetailsPanel" class="session-details-panel">
                        <div class="no-selection">
                            <p>Seleziona una sessione per visualizzare i dettagli</p>
                        </div>
                    </div>
                </div>

                <!-- Backup Manager -->
                <div class="backup-section">
                    <h3>Backup e Ripristino</h3>
                    <div class="backup-manager">
                        <div class="backup-actions">
                            <button id="exportDataBtn" class="button button-ghost">
                                📤 Esporta Dati
                            </button>
                            <button id="importDataBtn" class="button button-ghost">
                                📥 Importa Dati
                            </button>
                            <input type="file" id="importFileInput" accept=".json" style="display: none;">
                        </div>
                        <div class="backup-info">
                            <p>💡 Esporta i tuoi salvataggi per creare backup sicuri o trasferirli su altri dispositivi</p>
                        </div>
                    </div>
                </div>

                <!-- Session Actions -->
                <div class="session-actions">
                    <button id="saveCurrentBtn" class="button button-primary" style="display: none;">
                        💾 Salva Sessione Corrente
                    </button>
                    <button id="loadSelectedBtn" class="button button-secondary" style="display: none;">
                        📂 Carica Sessione Selezionata
                    </button>
                    <button id="deleteSelectedBtn" class="button button-ghost" style="display: none;">
                        🗑️ Elimina Sessione
                    </button>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s,n,i,o,r,l;(e=document.getElementById("newGameBtn"))==null||e.addEventListener("click",()=>{this.startNewGame()}),(t=document.getElementById("quickSaveBtn"))==null||t.addEventListener("click",()=>{this.quickSave()}),(a=document.getElementById("quickLoadBtn"))==null||a.addEventListener("click",()=>{this.quickLoad()}),(s=document.getElementById("saveCurrentBtn"))==null||s.addEventListener("click",()=>{this.saveCurrentSession()}),(n=document.getElementById("loadSelectedBtn"))==null||n.addEventListener("click",()=>{this.loadSelectedSession()}),(i=document.getElementById("deleteSelectedBtn"))==null||i.addEventListener("click",()=>{this.deleteSelectedSession()}),(o=document.getElementById("exportDataBtn"))==null||o.addEventListener("click",()=>{this.exportData()}),(r=document.getElementById("importDataBtn"))==null||r.addEventListener("click",()=>{document.getElementById("importFileInput").click()}),(l=document.getElementById("importFileInput"))==null||l.addEventListener("change",d=>{this.importData(d.target.files[0])})}loadSessionData(){if(!this.gameManager){console.log("GameManager not available");return}this.savedSessions=this.gameManager.getSavedSessions(),this.loadSaveSlots(),this.checkCurrentSession()}loadSaveSlots(){const e=Array.from({length:6},(t,a)=>{const s=a+1,n=this.savedSessions.find(i=>i.id===`session_${s}`)||(a===0?this.savedSessions[0]:null);if(n){const i=new Date(n.last_played),o=n.is_active;return`
                    <div class="save-slot-card ${o?"active":""}" data-session-id="${n.id}" data-slot="${s}">
                        <div class="slot-header">
                            <span class="slot-number">Slot ${s}</span>
                            ${o?'<span class="slot-status active">Attiva</span>':'<span class="slot-status">Salvata</span>'}
                        </div>
                        <div class="slot-content">
                            <h4 class="session-name">${n.session_name}</h4>
                            <div class="session-info">
                                <div class="info-item">
                                    <span class="info-label">Squadra:</span>
                                    <span class="info-value">${n.user_team_name}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Stagione:</span>
                                    <span class="info-value">${n.current_season}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Giornata:</span>
                                    <span class="info-value">${n.current_matchday}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Data:</span>
                                    <span class="info-value">${new Date(n.current_date).toLocaleDateString("it-IT")}</span>
                                </div>
                            </div>
                            <div class="slot-footer">
                                <span class="last-played">Ultimo accesso: ${i.toLocaleDateString("it-IT")} ${i.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</span>
                            </div>
                        </div>
                    </div>
                `}else return`
                    <div class="save-slot-card empty" data-slot="${s}">
                        <div class="slot-header">
                            <span class="slot-number">Slot ${s}</span>
                            <span class="slot-status empty">Vuoto</span>
                        </div>
                        <div class="slot-content">
                            <div class="empty-slot">
                                <div class="empty-icon">📁</div>
                                <p>Slot vuoto</p>
                                <button class="button button-ghost button-small" onclick="window.boltManager.uiManager.currentPage.createNewSession(${s})">
                                    Nuova Partita
                                </button>
                            </div>
                        </div>
                    </div>
                `}).join("");document.getElementById("saveSlotsGrid").innerHTML=e,document.querySelectorAll(".save-slot-card:not(.empty)").forEach(t=>{t.addEventListener("click",()=>{this.selectSession(t.dataset.sessionId)})})}selectSession(e){document.querySelectorAll(".save-slot-card").forEach(a=>{a.classList.remove("selected")});const t=document.querySelector(`[data-session-id="${e}"]`);t&&t.classList.add("selected"),this.selectedSession=this.savedSessions.find(a=>a.id===e),this.updateSessionDetails(),this.showSessionActions()}updateSessionDetails(){if(!this.selectedSession)return;const e=this.selectedSession,t=new Date(e.current_date),a=new Date(e.last_played),s=Math.floor(e.total_playtime/60),n=e.total_playtime%60,i=`
            <div class="session-details-content">
                <div class="session-header">
                    <h4>${e.session_name}</h4>
                    <span class="session-status ${e.is_active?"active":"inactive"}">
                        ${e.is_active?"🟢 Attiva":"⚪ Inattiva"}
                    </span>
                </div>

                <div class="session-stats">
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Squadra Controllata</span>
                            <span class="stat-value">${e.user_team_name}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Stagione Corrente</span>
                            <span class="stat-value">${e.current_season}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Giornata</span>
                            <span class="stat-value">${e.current_matchday}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Data di Gioco</span>
                            <span class="stat-value">${t.toLocaleDateString("it-IT",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Ultimo Accesso</span>
                            <span class="stat-value">${a.toLocaleDateString("it-IT")} alle ${a.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Tempo di Gioco</span>
                            <span class="stat-value">${s}h ${n}m</span>
                        </div>
                    </div>
                </div>

                <div class="session-progress">
                    <h5>Progressi</h5>
                    <div class="progress-info">
                        <p>📊 Stagione ${e.current_season} in corso</p>
                        <p>⚽ Giornata ${e.current_matchday} completata</p>
                        <p>🏆 Obiettivi: In definizione</p>
                    </div>
                </div>
            </div>
        `;document.getElementById("sessionDetailsPanel").innerHTML=i}showSessionActions(){document.getElementById("loadSelectedBtn").style.display="inline-block",document.getElementById("deleteSelectedBtn").style.display="inline-block"}checkCurrentSession(){this.gameManager.getCurrentSession()?(document.getElementById("saveCurrentBtn").style.display="inline-block",document.getElementById("quickSaveBtn").disabled=!1):document.getElementById("quickSaveBtn").disabled=!0}async startNewGame(){const e=`
            <div class="new-game-form">
                <h4>Nuova Partita</h4>
                <div class="form-group">
                    <label for="sessionNameInput">Nome Sessione:</label>
                    <input type="text" id="sessionNameInput" class="form-input" placeholder="La mia carriera" value="Carriera ${new Date().getFullYear()}">
                </div>
                <div class="form-group">
                    <label for="difficultySelect">Difficoltà:</label>
                    <select id="difficultySelect" class="form-select">
                        <option value="easy">Facile</option>
                        <option value="normal" selected>Normale</option>
                        <option value="hard">Difficile</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="teamSelect">Squadra:</label>
                    <select id="teamSelect" class="form-select">
                        <option value="random" selected>Squadra Casuale</option>
                        <option value="milan">AC Milano</option>
                        <option value="inter">Inter Milano</option>
                        <option value="juventus">Juventus FC</option>
                        <option value="roma">AS Roma</option>
                        <option value="napoli">SSC Napoli</option>
                        <option value="fiorentina">ACF Fiorentina</option>
                    </select>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal("Nuova Partita",e,[{text:"Inizia",class:"button-primary",onclick:"window.boltManager.uiManager.currentPage.confirmNewGame()"}])}async confirmNewGame(){const e=document.getElementById("sessionNameInput").value||"Nuova Carriera";document.getElementById("difficultySelect").value,document.getElementById("teamSelect").value;try{window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showLoading("Creazione nuova partita..."),await this.gameManager.startNewGame(),await this.gameManager.saveSession(e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Nuova partita creata con successo!","success"),window.boltManager.navigateToPage("team")}catch(t){console.error("Error creating new game:",t),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nella creazione: "+t.message,"error")}}async createNewSession(e){this.startNewGame()}async quickSave(){try{window.boltManager.uiManager.showLoading("Salvataggio rapido...");const e=await this.gameManager.saveSession();window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Salvataggio completato!","success"),this.loadSessionData()}catch(e){console.error("Error in quick save:",e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nel salvataggio: "+e.message,"error")}}async quickLoad(){if(this.savedSessions.length===0){window.boltManager.uiManager.showToast("Nessuna sessione salvata disponibile","warning");return}try{window.boltManager.uiManager.showLoading("Caricamento rapido...");const e=this.savedSessions[0];await this.gameManager.loadSession(e.id),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Sessione caricata!","success"),window.boltManager.navigateToPage("team")}catch(e){console.error("Error in quick load:",e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nel caricamento: "+e.message,"error")}}async saveCurrentSession(){var t;const e=`
            <div class="save-session-form">
                <h4>Salva Sessione Corrente</h4>
                <div class="form-group">
                    <label for="saveSessionNameInput">Nome Sessione:</label>
                    <input type="text" id="saveSessionNameInput" class="form-input" placeholder="Nome sessione" value="${((t=this.gameManager.gameData.userSession)==null?void 0:t.session_name)||"Sessione Corrente"}">
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="overwriteCheckbox" checked>
                        Sovrascrivi sessione esistente
                    </label>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal("Salva Sessione",e,[{text:"Salva",class:"button-primary",onclick:"window.boltManager.uiManager.currentPage.confirmSaveSession()"}])}async confirmSaveSession(){const e=document.getElementById("saveSessionNameInput").value;document.getElementById("overwriteCheckbox").checked;try{window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showLoading("Salvataggio sessione..."),await this.gameManager.saveSession(e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Sessione salvata con successo!","success"),this.loadSessionData()}catch(t){console.error("Error saving session:",t),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nel salvataggio: "+t.message,"error")}}async loadSelectedSession(){if(!this.selectedSession){window.boltManager.uiManager.showToast("Nessuna sessione selezionata","warning");return}const e=`
            <div class="load-confirm">
                <h4>Conferma Caricamento</h4>
                <p>Sei sicuro di voler caricare la sessione "<strong>${this.selectedSession.session_name}</strong>"?</p>
                <p class="warning">⚠️ I progressi non salvati della sessione corrente andranno persi.</p>
            </div>
        `;window.boltManager.uiManager.showModal("Carica Sessione",e,[{text:"Carica",class:"button-primary",onclick:"window.boltManager.uiManager.currentPage.confirmLoadSession()"}])}async confirmLoadSession(){try{window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showLoading("Caricamento sessione..."),await this.gameManager.loadSession(this.selectedSession.id),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Sessione caricata con successo!","success"),window.boltManager.navigateToPage("team")}catch(e){console.error("Error loading session:",e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nel caricamento: "+e.message,"error")}}async deleteSelectedSession(){if(!this.selectedSession){window.boltManager.uiManager.showToast("Nessuna sessione selezionata","warning");return}const e=`
            <div class="delete-confirm">
                <h4>Conferma Eliminazione</h4>
                <p>Sei sicuro di voler eliminare la sessione "<strong>${this.selectedSession.session_name}</strong>"?</p>
                <p class="warning">⚠️ Questa azione non può essere annullata.</p>
            </div>
        `;window.boltManager.uiManager.showModal("Elimina Sessione",e,[{text:"Elimina",class:"button-error",onclick:"window.boltManager.uiManager.currentPage.confirmDeleteSession()"}])}async confirmDeleteSession(){try{window.boltManager.uiManager.hideModal(),this.selectedSession.is_active&&(localStorage.removeItem("boltManager_gameData"),localStorage.removeItem("boltManager_currentSession")),window.boltManager.uiManager.showToast("Sessione eliminata","success"),this.selectedSession=null,this.loadSessionData(),document.getElementById("sessionDetailsPanel").innerHTML=`
                <div class="no-selection">
                    <p>Seleziona una sessione per visualizzare i dettagli</p>
                </div>
            `}catch(e){console.error("Error deleting session:",e),window.boltManager.uiManager.showToast("Errore nell'eliminazione: "+e.message,"error")}}exportData(){try{const e=this.gameManager.gameData,t={version:"1.0",exportDate:new Date().toISOString(),gameData:e},a=JSON.stringify(t,null,2),s=new Blob([a],{type:"application/json"}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download=`bolt_manager_backup_${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(n),window.boltManager.uiManager.showToast("Backup esportato con successo!","success")}catch(e){console.error("Error exporting data:",e),window.boltManager.uiManager.showToast("Errore nell'esportazione: "+e.message,"error")}}async importData(e){if(e)try{const t=await e.text(),a=JSON.parse(t);if(!a.gameData||!a.version)throw new Error("File di backup non valido");const s=`
                <div class="import-confirm">
                    <h4>Conferma Importazione</h4>
                    <p>Stai per importare un backup del <strong>${new Date(a.exportDate).toLocaleDateString("it-IT")}</strong></p>
                    <p class="warning">⚠️ Tutti i dati attuali verranno sostituiti.</p>
                </div>
            `;window.boltManager.uiManager.showModal("Importa Backup",s,[{text:"Importa",class:"button-primary",onclick:`window.boltManager.uiManager.currentPage.confirmImportData('${btoa(t)}')`}])}catch(t){console.error("Error reading import file:",t),window.boltManager.uiManager.showToast("Errore nella lettura del file: "+t.message,"error")}}async confirmImportData(e){try{window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showLoading("Importazione dati...");const t=atob(e),a=JSON.parse(t);this.gameManager.gameData=a.gameData,this.gameManager.saveGameData(),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Dati importati con successo!","success"),this.loadSessionData()}catch(t){console.error("Error importing data:",t),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nell'importazione: "+t.message,"error")}}}class z{constructor(){this.gameManager=null,this.searchFilters={position:"all",minAge:16,maxAge:40,minValue:0,maxValue:5e7,contractStatus:"all"},this.searchTerm="",this.availablePlayers=[],this.activeTransfers=[],this.selectedPlayer=null}async init(){var e;if(console.log("💰 Initializing TransferMarketPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadMarketData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Mercato Trasferimenti</span>
                </nav>

                <!-- Market Overview -->
                <div class="market-overview">
                    <h2>Mercato Trasferimenti</h2>
                    <div id="budgetTracker" class="budget-tracker">
                        <!-- Will be populated by loadBudgetTracker() -->
                    </div>
                </div>

                <!-- Search and Filters -->
                <div class="market-search-section">
                    <div class="search-controls">
                        <div class="search-bar">
                            <input type="text" id="playerSearchInput" class="search-input" placeholder="Cerca giocatore per nome...">
                            <button id="searchBtn" class="button button-primary">🔍 Cerca</button>
                        </div>
                        
                        <div class="search-filters">
                            <div class="filter-group">
                                <label>Ruolo:</label>
                                <select id="positionFilter">
                                    <option value="all">Tutti</option>
                                    <option value="GK">Portieri</option>
                                    <option value="DEF">Difensori</option>
                                    <option value="MID">Centrocampisti</option>
                                    <option value="ATT">Attaccanti</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label>Età:</label>
                                <input type="range" id="ageMinSlider" min="16" max="40" value="16" class="age-slider">
                                <span id="ageMinValue">16</span>
                                <span> - </span>
                                <input type="range" id="ageMaxSlider" min="16" max="40" value="40" class="age-slider">
                                <span id="ageMaxValue">40</span>
                            </div>
                            
                            <div class="filter-group">
                                <label>Valore Max:</label>
                                <input type="range" id="valueSlider" min="0" max="50000000" value="50000000" step="100000" class="value-slider">
                                <span id="valueDisplay">€50M</span>
                            </div>
                            
                            <div class="filter-group">
                                <label>Contratto:</label>
                                <select id="contractFilter">
                                    <option value="all">Tutti</option>
                                    <option value="expiring">In scadenza</option>
                                    <option value="long_term">Lungo termine</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Active Transfers -->
                <div class="active-transfers-section">
                    <h3>Trattative in Corso</h3>
                    <div id="activeTransfersList" class="active-transfers-list">
                        <!-- Will be populated by loadActiveTransfers() -->
                    </div>
                </div>

                <!-- Sponsor Banner -->
                <div class="sponsor-banner">
                    <div class="sponsor-content">
                        <span class="sponsor-label">Mercato powered by</span>
                        <img src="https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                             alt="Sponsor Market" class="sponsor-image">
                    </div>
                </div>

                <!-- Player Search Results -->
                <div class="search-results-section">
                    <h3>Giocatori Disponibili</h3>
                    <div class="results-header">
                        <span id="resultsCount">-- giocatori trovati</span>
                        <div class="sort-controls">
                            <label>Ordina per:</label>
                            <select id="sortSelect">
                                <option value="name">Nome</option>
                                <option value="age">Età</option>
                                <option value="overall_rating">Rating</option>
                                <option value="market_value">Valore</option>
                                <option value="contract_expires">Scadenza Contratto</option>
                            </select>
                        </div>
                    </div>
                    <div id="playerSearchResults" class="player-search-results">
                        <!-- Will be populated by loadSearchResults() -->
                    </div>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s,n,i,o,r;(e=document.getElementById("playerSearchInput"))==null||e.addEventListener("input",l=>{this.searchTerm=l.target.value.toLowerCase(),this.performSearch()}),(t=document.getElementById("searchBtn"))==null||t.addEventListener("click",()=>{this.performSearch()}),(a=document.getElementById("positionFilter"))==null||a.addEventListener("change",l=>{this.searchFilters.position=l.target.value,this.performSearch()}),(s=document.getElementById("ageMinSlider"))==null||s.addEventListener("input",l=>{this.searchFilters.minAge=parseInt(l.target.value),document.getElementById("ageMinValue").textContent=l.target.value,this.performSearch()}),(n=document.getElementById("ageMaxSlider"))==null||n.addEventListener("input",l=>{this.searchFilters.maxAge=parseInt(l.target.value),document.getElementById("ageMaxValue").textContent=l.target.value,this.performSearch()}),(i=document.getElementById("valueSlider"))==null||i.addEventListener("input",l=>{this.searchFilters.maxValue=parseInt(l.target.value),document.getElementById("valueDisplay").textContent=this.formatCurrency(l.target.value),this.performSearch()}),(o=document.getElementById("contractFilter"))==null||o.addEventListener("change",l=>{this.searchFilters.contractStatus=l.target.value,this.performSearch()}),(r=document.getElementById("sortSelect"))==null||r.addEventListener("change",()=>{this.performSearch()})}loadMarketData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available");return}this.loadBudgetTracker(),this.loadActiveTransfers(),this.loadAvailablePlayers(),this.performSearch()}loadBudgetTracker(){const e=this.gameManager.getUserTeam();if(!e)return;const t=`
            <div class="budget-display">
                <div class="budget-item">
                    <span class="budget-label">Budget Disponibile:</span>
                    <span class="budget-value">${this.formatCurrency(e.budget)}</span>
                </div>
                <div class="budget-item">
                    <span class="budget-label">Speso in Trattative:</span>
                    <span class="budget-value pending">${this.formatCurrency(this.calculatePendingSpending())}</span>
                </div>
                <div class="budget-item">
                    <span class="budget-label">Budget Effettivo:</span>
                    <span class="budget-value available">${this.formatCurrency(e.budget-this.calculatePendingSpending())}</span>
                </div>
            </div>
            <div class="budget-bar">
                <div class="budget-progress" style="width: ${Math.min(100,this.calculatePendingSpending()/e.budget*100)}%"></div>
            </div>
        `;document.getElementById("budgetTracker").innerHTML=t}calculatePendingSpending(){const e=this.gameManager.getUserTeam();return e?this.gameManager.gameData.transfers.filter(t=>t.from_team_id===e.id&&t.negotiation_status==="negotiating").reduce((t,a)=>t+a.transfer_fee+(a.signing_bonus||0),0):0}loadActiveTransfers(){const e=this.gameManager.getUserTeam();if(!e)return;if(this.activeTransfers=this.gameManager.gameData.transfers.filter(a=>(a.from_team_id===e.id||a.to_team_id===e.id)&&["negotiating","agreed"].includes(a.negotiation_status)),this.activeTransfers.length===0){document.getElementById("activeTransfersList").innerHTML=`
                <div class="no-transfers">
                    <p>Nessuna trattativa in corso</p>
                </div>
            `;return}const t=this.activeTransfers.map(a=>{const s=this.gameManager.gameData.players.find(l=>l.id===a.player_id),n=this.gameManager.gameData.teams.find(l=>l.id===a.from_team_id),i=this.gameManager.gameData.teams.find(l=>l.id===a.to_team_id),o=a.from_team_id===e.id,r=a.negotiation_status==="agreed"?"agreed":"negotiating";return`
                <div class="active-transfer-item ${r}">
                    <div class="transfer-player">
                        <span class="player-name">${s.first_name} ${s.last_name}</span>
                        <span class="player-position">${s.position}</span>
                        <span class="player-rating">${s.overall_rating}</span>
                    </div>
                    <div class="transfer-details">
                        <div class="transfer-direction">
                            ${o?`<span class="direction-in">← Da ${i.name}</span>`:`<span class="direction-out">→ A ${n.name}</span>`}
                        </div>
                        <div class="transfer-amount">${this.formatCurrency(a.transfer_fee)}</div>
                        <div class="transfer-status status-${r}">${this.getStatusText(a.negotiation_status)}</div>
                    </div>
                    <div class="transfer-actions">
                        ${a.negotiation_status==="negotiating"?`
                            <button class="button button-small button-secondary" onclick="window.boltManager.uiManager.currentPage.viewTransferDetails('${a.id}')">
                                Dettagli
                            </button>
                            ${o?`
                                <button class="button button-small button-ghost" onclick="window.boltManager.uiManager.currentPage.withdrawOffer('${a.id}')">
                                    Ritira
                                </button>
                            `:""}
                        `:`
                            <button class="button button-small button-primary" onclick="window.boltManager.uiManager.currentPage.finalizeTransfer('${a.id}')">
                                Finalizza
                            </button>
                        `}
                    </div>
                </div>
            `}).join("");document.getElementById("activeTransfersList").innerHTML=t}getStatusText(e){return{negotiating:"In Trattativa",agreed:"Accordo Raggiunto",completed:"Completato",failed:"Fallito"}[e]||e}loadAvailablePlayers(){const e=this.gameManager.getUserTeam();e&&(this.availablePlayers=this.gameManager.gameData.players.filter(t=>t.team_id!==e.id&&t.injury_status==="healthy"))}performSearch(){var a;let e=[...this.availablePlayers];if(this.searchTerm&&(e=e.filter(s=>s.first_name.toLowerCase().includes(this.searchTerm)||s.last_name.toLowerCase().includes(this.searchTerm))),this.searchFilters.position!=="all"&&(e=e.filter(s=>s.position===this.searchFilters.position)),e=e.filter(s=>s.age>=this.searchFilters.minAge&&s.age<=this.searchFilters.maxAge&&s.market_value<=this.searchFilters.maxValue),this.searchFilters.contractStatus==="expiring"){const s=new Date;s.setFullYear(s.getFullYear()+1),e=e.filter(n=>new Date(n.contract_expires)<=s)}else if(this.searchFilters.contractStatus==="long_term"){const s=new Date;s.setFullYear(s.getFullYear()+2),e=e.filter(n=>new Date(n.contract_expires)>s)}const t=((a=document.getElementById("sortSelect"))==null?void 0:a.value)||"name";e.sort((s,n)=>{switch(t){case"name":return`${s.first_name} ${s.last_name}`.localeCompare(`${n.first_name} ${n.last_name}`);case"age":return s.age-n.age;case"overall_rating":return n.overall_rating-s.overall_rating;case"market_value":return n.market_value-s.market_value;case"contract_expires":return new Date(s.contract_expires)-new Date(n.contract_expires);default:return 0}}),document.getElementById("resultsCount").textContent=`${e.length} giocatori trovati`,this.renderSearchResults(e)}renderSearchResults(e){if(e.length===0){document.getElementById("playerSearchResults").innerHTML=`
                <div class="no-results">
                    <p>Nessun giocatore trovato con i criteri di ricerca attuali</p>
                    <button class="button button-secondary" onclick="window.boltManager.uiManager.currentPage.clearFilters()">
                        Cancella Filtri
                    </button>
                </div>
            `;return}const t=e.slice(0,50).map(a=>{const s=this.gameManager.gameData.teams.find(o=>o.id===a.team_id),n=new Date(a.contract_expires),i=n<=new Date(Date.now()+365*24*60*60*1e3);return`
                <div class="player-market-card" data-player-id="${a.id}" tabindex="0">
                    <div class="player-header">
                        <div class="player-avatar">
                            <span class="player-position">${a.position}</span>
                        </div>
                        <div class="player-info">
                            <h4 class="player-name">${a.first_name} ${a.last_name}</h4>
                            <span class="player-team">${(s==null?void 0:s.name)||"Unknown"}</span>
                            <span class="player-age">${a.age} anni</span>
                        </div>
                        <div class="player-rating">
                            <span class="rating-value">${a.overall_rating}</span>
                            <span class="rating-potential">Pot: ${a.potential}</span>
                        </div>
                    </div>

                    <div class="player-attributes">
                        <div class="attribute-item">
                            <span class="attr-label">VEL</span>
                            <span class="attr-value">${a.pace}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">TIR</span>
                            <span class="attr-value">${a.shooting}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">PAS</span>
                            <span class="attr-value">${a.passing}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">DRI</span>
                            <span class="attr-value">${a.dribbling}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">DIF</span>
                            <span class="attr-value">${a.defending}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">FIS</span>
                            <span class="attr-value">${a.physical}</span>
                        </div>
                    </div>

                    <div class="player-market-info">
                        <div class="market-value">
                            <span class="value-label">Valore:</span>
                            <span class="value-amount">${this.formatCurrency(a.market_value)}</span>
                        </div>
                        <div class="contract-info">
                            <span class="contract-label">Contratto:</span>
                            <span class="contract-expiry ${i?"expiring":""}">
                                ${n.toLocaleDateString("it-IT")}
                            </span>
                        </div>
                        <div class="salary-info">
                            <span class="salary-label">Stipendio:</span>
                            <span class="salary-amount">${this.formatCurrency(a.salary)}/sett</span>
                        </div>
                    </div>

                    <div class="player-actions">
                        <button class="button button-primary" onclick="window.boltManager.uiManager.currentPage.makeOffer('${a.id}')">
                            💰 Fai Offerta
                        </button>
                        <button class="button button-ghost" onclick="window.boltManager.uiManager.currentPage.viewPlayerDetails('${a.id}')">
                            👁️ Dettagli
                        </button>
                    </div>
                </div>
            `}).join("");document.getElementById("playerSearchResults").innerHTML=t,document.querySelectorAll(".player-market-card").forEach(a=>{a.addEventListener("click",s=>{if(!s.target.closest(".player-actions")){const n=a.dataset.playerId;this.viewPlayerDetails(n)}}),a.addEventListener("keydown",s=>{if(s.key==="Enter"||s.key===" "){s.preventDefault();const n=a.dataset.playerId;this.viewPlayerDetails(n)}})})}clearFilters(){this.searchFilters={position:"all",minAge:16,maxAge:40,minValue:0,maxValue:5e7,contractStatus:"all"},this.searchTerm="",document.getElementById("playerSearchInput").value="",document.getElementById("positionFilter").value="all",document.getElementById("ageMinSlider").value=16,document.getElementById("ageMaxSlider").value=40,document.getElementById("valueSlider").value=5e7,document.getElementById("contractFilter").value="all",document.getElementById("ageMinValue").textContent="16",document.getElementById("ageMaxValue").textContent="40",document.getElementById("valueDisplay").textContent="€50M",this.performSearch()}makeOffer(e){const t=this.gameManager.gameData.players.find(r=>r.id===e),a=this.gameManager.gameData.teams.find(r=>r.id===t.team_id),s=this.gameManager.getUserTeam();if(!t||!a||!s)return;const n=Math.round(t.market_value*1.1),i=Math.round(t.salary*1.2),o=`
            <div class="negotiation-panel">
                <div class="player-summary">
                    <h4>${t.first_name} ${t.last_name}</h4>
                    <p>Da ${a.name} a ${s.name}</p>
                    <p>Valore di mercato: ${this.formatCurrency(t.market_value)}</p>
                </div>

                <div class="offer-form">
                    <div class="form-group">
                        <label for="transferFeeInput">Offerta Trasferimento:</label>
                        <input type="number" id="transferFeeInput" value="${n}" min="0" step="50000" class="form-input">
                        <span class="input-help">Suggerito: ${this.formatCurrency(n)}</span>
                    </div>

                    <div class="form-group">
                        <label for="playerSalaryInput">Stipendio Settimanale:</label>
                        <input type="number" id="playerSalaryInput" value="${i}" min="0" step="1000" class="form-input">
                        <span class="input-help">Attuale: ${this.formatCurrency(t.salary)}</span>
                    </div>

                    <div class="form-group">
                        <label for="contractLengthInput">Durata Contratto (anni):</label>
                        <select id="contractLengthInput" class="form-select">
                            <option value="1">1 anno</option>
                            <option value="2">2 anni</option>
                            <option value="3" selected>3 anni</option>
                            <option value="4">4 anni</option>
                            <option value="5">5 anni</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="signingBonusInput">Bonus alla Firma (opzionale):</label>
                        <input type="number" id="signingBonusInput" value="0" min="0" step="10000" class="form-input">
                    </div>

                    <div class="form-group">
                        <label for="transferTypeSelect">Tipo Trasferimento:</label>
                        <select id="transferTypeSelect" class="form-select">
                            <option value="permanent" selected>Definitivo</option>
                            <option value="loan">Prestito</option>
                        </select>
                    </div>
                </div>

                <div class="offer-summary">
                    <div class="cost-breakdown">
                        <div class="cost-item">
                            <span>Costo Trasferimento:</span>
                            <span id="transferCostDisplay">${this.formatCurrency(n)}</span>
                        </div>
                        <div class="cost-item">
                            <span>Bonus Firma:</span>
                            <span id="bonusCostDisplay">€0</span>
                        </div>
                        <div class="cost-item">
                            <span>Commissioni (5%):</span>
                            <span id="agentFeeDisplay">${this.formatCurrency(n*.05)}</span>
                        </div>
                        <div class="cost-item total">
                            <span>Costo Totale:</span>
                            <span id="totalCostDisplay">${this.formatCurrency(n*1.05)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal(`Offerta per ${t.first_name} ${t.last_name}`,o,[{text:"Invia Offerta",class:"button-primary",onclick:`window.boltManager.uiManager.currentPage.submitOffer('${e}')`}]),this.setupOfferCalculation()}setupOfferCalculation(){["transferFeeInput","signingBonusInput"].forEach(t=>{var a;(a=document.getElementById(t))==null||a.addEventListener("input",()=>{this.updateOfferCalculation()})}),this.updateOfferCalculation()}updateOfferCalculation(){var n,i;const e=parseInt(((n=document.getElementById("transferFeeInput"))==null?void 0:n.value)||0),t=parseInt(((i=document.getElementById("signingBonusInput"))==null?void 0:i.value)||0),a=e*.05,s=e+t+a;document.getElementById("transferCostDisplay").textContent=this.formatCurrency(e),document.getElementById("bonusCostDisplay").textContent=this.formatCurrency(t),document.getElementById("agentFeeDisplay").textContent=this.formatCurrency(a),document.getElementById("totalCostDisplay").textContent=this.formatCurrency(s)}async submitOffer(e){const t=parseInt(document.getElementById("transferFeeInput").value),a=parseInt(document.getElementById("playerSalaryInput").value),s=parseInt(document.getElementById("contractLengthInput").value),n=parseInt(document.getElementById("signingBonusInput").value||0),i=document.getElementById("transferTypeSelect").value,o=this.gameManager.gameData.players.find(l=>l.id===e),r=this.gameManager.getUserTeam();try{window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showLoading("Invio offerta...");const l=await this.gameManager.executeTransferOffer({playerId:e,fromTeamId:r.id,toTeamId:o.team_id,transferFee:t,playerSalary:a,contractLength:s,transferType:i,signingBonus:n});if(window.boltManager.uiManager.hideLoading(),l.success){const d=this.getOfferResponseMessage(l.response);window.boltManager.uiManager.showToast(d,l.response.type==="accepted"?"success":"info",5e3),this.loadMarketData()}else window.boltManager.uiManager.showToast("Errore nell'invio dell'offerta: "+l.error,"error")}catch(l){console.error("Error submitting offer:",l),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nell'invio dell'offerta","error")}}getOfferResponseMessage(e){switch(e.type){case"accepted":return"✅ Offerta accettata! Procedi con le visite mediche.";case"counter_offer":return`💬 Controproposta ricevuta: €${e.counterTerms.transferFee.toLocaleString()}`;case"rejected":return`❌ Offerta rifiutata: ${e.reason}`;default:return"Risposta ricevuta"}}viewPlayerDetails(e){const t=this.gameManager.gameData.players.find(n=>n.id===e),a=this.gameManager.gameData.teams.find(n=>n.id===t.team_id);if(!t)return;const s=`
            <div class="player-details-modal">
                <div class="player-header">
                    <h3>${t.first_name} ${t.last_name}</h3>
                    <div class="player-meta">
                        <span class="player-position">${t.position}</span>
                        <span class="player-age">${t.age} anni</span>
                        <span class="player-team">${a==null?void 0:a.name}</span>
                    </div>
                </div>

                <div class="player-ratings">
                    <div class="rating-item">
                        <span class="rating-label">Overall:</span>
                        <span class="rating-value">${t.overall_rating}</span>
                    </div>
                    <div class="rating-item">
                        <span class="rating-label">Potenziale:</span>
                        <span class="rating-value">${t.potential}</span>
                    </div>
                </div>

                <div class="attributes-grid">
                    <div class="attribute-item">
                        <span class="attr-label">Velocità</span>
                        <span class="attr-value">${t.pace}</span>
                    </div>
                    <div class="attribute-item">
                        <span class="attr-label">Tiro</span>
                        <span class="attr-value">${t.shooting}</span>
                    </div>
                    <div class="attribute-item">
                        <span class="attr-label">Passaggio</span>
                        <span class="attr-value">${t.passing}</span>
                    </div>
                    <div class="attribute-item">
                        <span class="attr-label">Dribbling</span>
                        <span class="attr-value">${t.dribbling}</span>
                    </div>
                    <div class="attribute-item">
                        <span class="attr-label">Difesa</span>
                        <span class="attr-value">${t.defending}</span>
                    </div>
                    <div class="attribute-item">
                        <span class="attr-label">Fisico</span>
                        <span class="attr-value">${t.physical}</span>
                    </div>
                </div>

                <div class="contract-details">
                    <h4>Dettagli Contrattuali</h4>
                    <div class="contract-info">
                        <div class="info-item">
                            <span class="info-label">Valore di Mercato:</span>
                            <span class="info-value">${this.formatCurrency(t.market_value)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Stipendio Attuale:</span>
                            <span class="info-value">${this.formatCurrency(t.salary)}/settimana</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Scadenza Contratto:</span>
                            <span class="info-value">${new Date(t.contract_expires).toLocaleDateString("it-IT")}</span>
                        </div>
                    </div>
                </div>

                <div class="season-stats">
                    <h4>Statistiche Stagione</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Partite:</span>
                            <span class="stat-value">${t.matches_played}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Gol:</span>
                            <span class="stat-value">${t.goals_scored}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Assist:</span>
                            <span class="stat-value">${t.assists}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Cartellini:</span>
                            <span class="stat-value">🟨${t.yellow_cards} 🟥${t.red_cards}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal(`${t.first_name} ${t.last_name}`,s)}viewTransferDetails(e){const t=this.gameManager.gameData.transfers.find(o=>o.id===e);if(!t)return;const a=this.gameManager.gameData.players.find(o=>o.id===t.player_id),s=this.gameManager.gameData.teams.find(o=>o.id===t.from_team_id),n=this.gameManager.gameData.teams.find(o=>o.id===t.to_team_id),i=`
            <div class="transfer-details">
                <h4>Dettagli Trattativa</h4>
                <div class="transfer-summary">
                    <p><strong>Giocatore:</strong> ${a.first_name} ${a.last_name}</p>
                    <p><strong>Da:</strong> ${n.name}</p>
                    <p><strong>A:</strong> ${s.name}</p>
                    <p><strong>Stato:</strong> ${this.getStatusText(t.negotiation_status)}</p>
                </div>

                <div class="transfer-terms">
                    <h5>Termini Offerta</h5>
                    <div class="terms-grid">
                        <div class="term-item">
                            <span>Costo Trasferimento:</span>
                            <span>${this.formatCurrency(t.transfer_fee)}</span>
                        </div>
                        <div class="term-item">
                            <span>Stipendio:</span>
                            <span>${this.formatCurrency(t.player_salary)}/settimana</span>
                        </div>
                        <div class="term-item">
                            <span>Durata Contratto:</span>
                            <span>${t.contract_length} anni</span>
                        </div>
                        <div class="term-item">
                            <span>Bonus Firma:</span>
                            <span>${this.formatCurrency(t.signing_bonus||0)}</span>
                        </div>
                    </div>
                </div>

                <div class="offer-history">
                    <h5>Cronologia Offerte</h5>
                    <div class="history-list">
                        ${t.offer_history.map(o=>`
                            <div class="history-item">
                                <span class="history-date">${new Date(o.date).toLocaleDateString("it-IT")}</span>
                                <span class="history-type">${o.type}</span>
                                <span class="history-amount">${this.formatCurrency(o.terms.transferFee)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal("Dettagli Trattativa",i)}async withdrawOffer(e){window.boltManager.uiManager.showModal("Ritira Offerta",`
            <div class="withdraw-confirm">
                <h4>Conferma Ritiro Offerta</h4>
                <p>Sei sicuro di voler ritirare questa offerta?</p>
                <p class="warning">⚠️ Questa azione non può essere annullata.</p>
            </div>
        `,[{text:"Ritira",class:"button-error",onclick:`window.boltManager.uiManager.currentPage.confirmWithdrawOffer('${e}')`}])}async confirmWithdrawOffer(e){try{window.boltManager.uiManager.hideModal();const t=this.gameManager.gameData.transfers.find(a=>a.id===e);t&&(t.negotiation_status="failed",t.updated_at=new Date().toISOString()),window.boltManager.uiManager.showToast("Offerta ritirata","info"),this.loadActiveTransfers()}catch(t){console.error("Error withdrawing offer:",t),window.boltManager.uiManager.showToast("Errore nel ritiro dell'offerta","error")}}async finalizeTransfer(e){try{window.boltManager.uiManager.showLoading("Finalizzazione trasferimento...");const t=await this.gameManager.executeTransferProcess({transferId:e,decision:"accept",medicalPassed:!0});window.boltManager.uiManager.hideLoading(),t.success?(window.boltManager.uiManager.showToast("Trasferimento completato con successo!","success"),this.loadMarketData()):window.boltManager.uiManager.showToast("Errore nel completamento: "+t.error,"error")}catch(t){console.error("Error finalizing transfer:",t),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nella finalizzazione","error")}}formatCurrency(e){return e>=1e6?`€${(e/1e6).toFixed(1)}M`:e>=1e3?`€${(e/1e3).toFixed(0)}K`:`€${e.toLocaleString()}`}}class F{constructor(){this.gameManager=null,this.currentFilter="all",this.selectedStaff=null}async init(){var e;if(console.log("👥 Initializing StaffManagementPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadStaffData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Gestione Staff</span>
                </nav>

                <!-- Staff Overview -->
                <div class="staff-overview">
                    <h2>Gestione Staff Tecnico</h2>
                    <div id="staffSummary" class="staff-summary">
                        <!-- Will be populated by loadStaffSummary() -->
                    </div>
                </div>

                <!-- Staff Filters -->
                <div class="staff-filters">
                    <div class="filter-group">
                        <label for="roleFilter">Ruolo:</label>
                        <select id="roleFilter" class="filter-select">
                            <option value="all">Tutti</option>
                            <option value="head_coach">Allenatore Capo</option>
                            <option value="assistant_coach">Vice Allenatore</option>
                            <option value="fitness_coach">Preparatore Atletico</option>
                            <option value="scout">Scout</option>
                            <option value="physio">Fisioterapista</option>
                            <option value="analyst">Analista</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="experienceFilter">Esperienza:</label>
                        <select id="experienceFilter" class="filter-select">
                            <option value="all">Tutti</option>
                            <option value="junior">Junior (0-2 anni)</option>
                            <option value="mid">Intermedio (3-7 anni)</option>
                            <option value="senior">Senior (8+ anni)</option>
                        </select>
                    </div>

                    <div class="filter-actions">
                        <button id="hireStaffBtn" class="button button-primary">
                            ➕ Assumi Staff
                        </button>
                    </div>
                </div>

                <!-- Staff Grid -->
                <div id="staffGrid" class="staff-grid">
                    <!-- Will be populated by loadStaffGrid() -->
                </div>

                <!-- Sponsor Slot -->
                <div class="sponsor-slot">
                    <div class="sponsor-content">
                        <span class="sponsor-label">Staff Excellence powered by</span>
                        <img src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=120&fit=crop" 
                             alt="Sponsor Staff" class="sponsor-image">
                    </div>
                </div>

                <!-- Team Bonuses -->
                <div class="team-bonuses-section">
                    <h3>Bonus Squadra</h3>
                    <div id="teamBonuses" class="team-bonuses">
                        <!-- Will be populated by loadTeamBonuses() -->
                    </div>
                </div>

                <!-- Staff Details Panel -->
                <div id="staffDetailsPanel" class="staff-details-panel" style="display: none;">
                    <h3>Dettagli Staff</h3>
                    <div id="staffDetailsContent" class="staff-details-content">
                        <!-- Will be populated when staff is selected -->
                    </div>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a;(e=document.getElementById("roleFilter"))==null||e.addEventListener("change",s=>{this.currentFilter=s.target.value,this.loadStaffGrid()}),(t=document.getElementById("experienceFilter"))==null||t.addEventListener("change",s=>{this.experienceFilter=s.target.value,this.loadStaffGrid()}),(a=document.getElementById("hireStaffBtn"))==null||a.addEventListener("click",()=>{this.showHireStaffModal()})}loadStaffData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available");return}this.loadStaffSummary(),this.loadStaffGrid(),this.loadTeamBonuses()}loadStaffSummary(){const e=this.gameManager.getUserTeam();if(!e)return;const t=this.gameManager.gameData.staff.filter(o=>o.team_id===e.id),a=t.reduce((o,r)=>o+r.salary,0),s=t.reduce((o,r)=>o+r.experience_years,0)/t.length||0,n=t.reduce((o,r)=>o+r.morale,0)/t.length||0,i=`
            <div class="summary-stats">
                <div class="stat-item">
                    <span class="stat-label">Membri Staff:</span>
                    <span class="stat-value">${t.length}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Costo Totale:</span>
                    <span class="stat-value">${this.formatCurrency(a)}/settimana</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Esperienza Media:</span>
                    <span class="stat-value">${s.toFixed(1)} anni</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Morale Medio:</span>
                    <span class="stat-value">
                        <div class="morale-indicator">
                            <div class="morale-bar" style="width: ${n}%; background-color: ${this.getMoraleColor(n)}"></div>
                            <span class="morale-text">${n.toFixed(0)}%</span>
                        </div>
                    </span>
                </div>
            </div>
        `;document.getElementById("staffSummary").innerHTML=i}loadStaffGrid(){const e=this.gameManager.getUserTeam();if(!e)return;let t=this.gameManager.gameData.staff.filter(s=>s.team_id===e.id);if(this.currentFilter!=="all"&&(t=t.filter(s=>s.role===this.currentFilter)),this.experienceFilter)switch(this.experienceFilter){case"junior":t=t.filter(s=>s.experience_years<=2);break;case"mid":t=t.filter(s=>s.experience_years>=3&&s.experience_years<=7);break;case"senior":t=t.filter(s=>s.experience_years>=8);break}if(t.length===0){document.getElementById("staffGrid").innerHTML=`
                <div class="no-staff">
                    <h3>Nessun membro dello staff trovato</h3>
                    <p>Modifica i filtri o assumi nuovo staff</p>
                    <button class="button button-primary" onclick="window.boltManager.uiManager.currentPage.showHireStaffModal()">
                        ➕ Assumi Staff
                    </button>
                </div>
            `;return}const a=t.map(s=>this.renderStaffCard(s)).join("");document.getElementById("staffGrid").innerHTML=a,this.setupStaffCardListeners()}renderStaffCard(e){const t=this.getRoleDisplayName(e.role);this.getExperienceLevel(e.experience_years);const a=this.getMoraleColor(e.morale);return`
            <div class="staff-card" data-staff-id="${e.id}" tabindex="0">
                <div class="staff-header">
                    <div class="staff-avatar">
                        <span class="staff-role-icon">${this.getRoleIcon(e.role)}</span>
                    </div>
                    <div class="staff-info">
                        <h4 class="staff-name">${e.first_name} ${e.last_name}</h4>
                        <span class="staff-role">${t}</span>
                        <span class="staff-experience">${e.experience_years} anni di esperienza</span>
                    </div>
                    <div class="staff-status">
                        ${e.is_head_of_department?'<span class="head-badge">👑 Responsabile</span>':""}
                    </div>
                </div>

                <div class="staff-competencies">
                    <h5>Competenze</h5>
                    <div class="competency-grid">
                        ${this.renderCompetencies(e)}
                    </div>
                </div>

                <div class="staff-stats">
                    <div class="stat-row">
                        <span class="stat-label">Morale</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${e.morale}%; background-color: ${a}"></div>
                            <span class="progress-text">${Math.round(e.morale)}%</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Lealtà</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${e.loyalty}%; background-color: var(--primary)"></div>
                            <span class="progress-text">${Math.round(e.loyalty)}%</span>
                        </div>
                    </div>
                </div>

                <div class="staff-contract">
                    <div class="contract-item">
                        <span class="contract-label">Stipendio:</span>
                        <span class="contract-value">${this.formatCurrency(e.salary)}/sett</span>
                    </div>
                    <div class="contract-item">
                        <span class="contract-label">Scadenza:</span>
                        <span class="contract-value">${new Date(e.contract_expires).toLocaleDateString("it-IT")}</span>
                    </div>
                </div>

                <div class="staff-actions">
                    <button class="button button-primary button-small" onclick="window.boltManager.uiManager.currentPage.assignRole('${e.id}')">
                        🔄 Cambia Ruolo
                    </button>
                    <button class="button button-ghost button-small" onclick="window.boltManager.uiManager.currentPage.viewStaffDetails('${e.id}')">
                        👁️ Dettagli
                    </button>
                </div>
            </div>
        `}renderCompetencies(e){const t=[];return e.coaching_ability&&t.push({label:"Allenamento",value:e.coaching_ability}),e.tactical_knowledge&&t.push({label:"Tattica",value:e.tactical_knowledge}),e.motivational_skills&&t.push({label:"Motivazione",value:e.motivational_skills}),e.fitness_expertise&&t.push({label:"Fitness",value:e.fitness_expertise}),e.scouting_ability&&t.push({label:"Scouting",value:e.scouting_ability}),e.medical_expertise&&t.push({label:"Medicina",value:e.medical_expertise}),t.slice(0,3).map(a=>`
            <div class="competency-item">
                <span class="comp-label">${a.label}</span>
                <span class="comp-value">${a.value}</span>
            </div>
        `).join("")}getRoleDisplayName(e){return{head_coach:"Allenatore Capo",assistant_coach:"Vice Allenatore",fitness_coach:"Preparatore Atletico",goalkeeping_coach:"Allenatore Portieri",scout:"Scout",chief_scout:"Capo Scout",physio:"Fisioterapista",team_doctor:"Medico Sociale",analyst:"Analista",youth_coach:"Allenatore Giovanili",technical_director:"Direttore Tecnico",sporting_director:"Direttore Sportivo"}[e]||e}getRoleIcon(e){return{head_coach:"👨‍🏫",assistant_coach:"👨‍💼",fitness_coach:"💪",goalkeeping_coach:"🥅",scout:"🔍",chief_scout:"🕵️",physio:"🏥",team_doctor:"👨‍⚕️",analyst:"📊",youth_coach:"👶",technical_director:"🎯",sporting_director:"🏆"}[e]||"👤"}getExperienceLevel(e){return e<=2?"Junior":e<=7?"Intermedio":"Senior"}setupStaffCardListeners(){document.querySelectorAll(".staff-card").forEach(e=>{e.addEventListener("click",t=>{if(!t.target.closest(".staff-actions")){const a=e.dataset.staffId;this.selectStaff(a)}}),e.addEventListener("keydown",t=>{if(t.key==="Enter"||t.key===" "){t.preventDefault();const a=e.dataset.staffId;this.selectStaff(a)}})})}selectStaff(e){document.querySelectorAll(".staff-card").forEach(a=>{a.classList.remove("selected")});const t=document.querySelector(`[data-staff-id="${e}"]`);t&&t.classList.add("selected"),this.selectedStaff=this.gameManager.gameData.staff.find(a=>a.id===e),this.showStaffDetails()}showStaffDetails(){if(!this.selectedStaff)return;const e=this.selectedStaff,t=`
            <div class="staff-details-content">
                <div class="staff-profile">
                    <h4>${e.first_name} ${e.last_name}</h4>
                    <p class="staff-role">${this.getRoleDisplayName(e.role)}</p>
                    <p class="staff-age">${e.age} anni, ${e.experience_years} anni di esperienza</p>
                </div>

                <div class="competency-radar">
                    <h5>Competenze Dettagliate</h5>
                    <div id="competencyChart" class="competency-chart">
                        ${this.renderCompetencyRadar(e)}
                    </div>
                </div>

                <div class="staff-achievements">
                    <h5>Riconoscimenti</h5>
                    <div class="achievements-list">
                        ${e.achievements&&e.achievements.length>0?e.achievements.map(a=>`
                                <div class="achievement-item">🏆 ${a}</div>
                            `).join(""):"<p>Nessun riconoscimento particolare</p>"}
                    </div>
                </div>

                <div class="staff-specialization">
                    <h5>Specializzazione</h5>
                    <p>${e.specialization||"Nessuna specializzazione specifica"}</p>
                </div>

                <div class="staff-languages">
                    <h5>Lingue</h5>
                    <div class="languages-list">
                        ${e.languages&&e.languages.length>0?e.languages.map(a=>`<span class="language-tag">${a}</span>`).join(""):'<span class="language-tag">Italiano</span>'}
                    </div>
                </div>

                <div class="staff-contract-details">
                    <h5>Dettagli Contratto</h5>
                    <div class="contract-grid">
                        <div class="contract-item">
                            <span class="contract-label">Stipendio:</span>
                            <span class="contract-value">${this.formatCurrency(e.salary)}/settimana</span>
                        </div>
                        <div class="contract-item">
                            <span class="contract-label">Scadenza:</span>
                            <span class="contract-value">${new Date(e.contract_expires).toLocaleDateString("it-IT")}</span>
                        </div>
                        <div class="contract-item">
                            <span class="contract-label">Reputazione:</span>
                            <span class="contract-value">${e.reputation}/100</span>
                        </div>
                    </div>
                </div>
            </div>
        `;document.getElementById("staffDetailsContent").innerHTML=t,document.getElementById("staffDetailsPanel").style.display="block"}renderCompetencyRadar(e){return[{label:"Allenamento",value:e.coaching_ability||0},{label:"Tattica",value:e.tactical_knowledge||0},{label:"Motivazione",value:e.motivational_skills||0},{label:"Fitness",value:e.fitness_expertise||0},{label:"Scouting",value:e.scouting_ability||0},{label:"Medicina",value:e.medical_expertise||0}].filter(a=>a.value>0).map(a=>`
            <div class="radar-item">
                <span class="radar-label">${a.label}</span>
                <div class="radar-bar">
                    <div class="radar-fill" style="width: ${a.value}%"></div>
                    <span class="radar-value">${a.value}</span>
                </div>
            </div>
        `).join("")}loadTeamBonuses(){const e=this.gameManager.getUserTeam();if(!e)return;const t=this.calculateTeamBonuses(e.id),a=`
            <div class="bonuses-grid">
                <div class="bonus-item">
                    <span class="bonus-label">Efficienza Allenamento</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${t.training_efficiency}%"></div>
                        <span class="bonus-value">+${t.training_efficiency.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Prevenzione Infortuni</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${t.injury_prevention}%"></div>
                        <span class="bonus-value">+${t.injury_prevention.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Bonus Tattico</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${t.tactical_bonus}%"></div>
                        <span class="bonus-value">+${t.tactical_bonus.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Bonus Morale</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${t.morale_bonus}%"></div>
                        <span class="bonus-value">+${t.morale_bonus.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Efficacia Scouting</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${t.scouting_bonus}%"></div>
                        <span class="bonus-value">+${t.scouting_bonus.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Sviluppo Giovanili</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${t.youth_development}%"></div>
                        <span class="bonus-value">+${t.youth_development.toFixed(0)}%</span>
                    </div>
                </div>
            </div>
        `;document.getElementById("teamBonuses").innerHTML=a}calculateTeamBonuses(e){const t=this.gameManager.gameData.staff.filter(s=>s.team_id===e);let a={training_efficiency:0,injury_prevention:0,tactical_bonus:0,morale_bonus:0,scouting_bonus:0,youth_development:0};return t.forEach(s=>{const n=s.is_head_of_department?1.5:1;switch(s.role){case"head_coach":a.training_efficiency+=(s.coaching_ability||50)*.2*n,a.tactical_bonus+=(s.tactical_knowledge||50)*.3*n,a.morale_bonus+=(s.motivational_skills||50)*.2*n;break;case"fitness_coach":a.training_efficiency+=(s.fitness_expertise||50)*.3*n,a.injury_prevention+=(s.fitness_expertise||50)*.4*n;break;case"scout":case"chief_scout":a.scouting_bonus+=(s.scouting_ability||50)*.5*n;break;case"physio":case"team_doctor":a.injury_prevention+=(s.medical_expertise||50)*.3*n;break;case"youth_coach":a.youth_development+=(s.coaching_ability||50)*.4*n;break}}),Object.keys(a).forEach(s=>{a[s]=Math.min(100,Math.max(0,a[s]))}),a}assignRole(e){var s;const t=this.gameManager.gameData.staff.find(n=>n.id===e);if(!t)return;const a=`
            <div class="assign-role-modal">
                <div class="current-role">
                    <h4>Membro Staff: ${t.first_name} ${t.last_name}</h4>
                    <p>Ruolo attuale: ${this.getRoleDisplayName(t.role)}</p>
                </div>

                <div class="role-selection">
                    <div class="form-group">
                        <label for="newRoleSelect">Nuovo Ruolo:</label>
                        <select id="newRoleSelect" class="form-select">
                            <option value="head_coach">Allenatore Capo</option>
                            <option value="assistant_coach">Vice Allenatore</option>
                            <option value="fitness_coach">Preparatore Atletico</option>
                            <option value="goalkeeping_coach">Allenatore Portieri</option>
                            <option value="scout">Scout</option>
                            <option value="chief_scout">Capo Scout</option>
                            <option value="physio">Fisioterapista</option>
                            <option value="team_doctor">Medico Sociale</option>
                            <option value="analyst">Analista</option>
                            <option value="youth_coach">Allenatore Giovanili</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="specializationInput">Specializzazione (opzionale):</label>
                        <input type="text" id="specializationInput" class="form-input" placeholder="es. Difesa, Attacco, Giovani...">
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="headOfDepartmentCheck">
                            Responsabile di Dipartimento
                        </label>
                    </div>

                    <div class="form-group">
                        <label for="salaryAdjustmentInput">Adeguamento Stipendio:</label>
                        <input type="number" id="salaryAdjustmentInput" class="form-input" value="0" step="500">
                        <span class="input-help">Attuale: ${this.formatCurrency(t.salary)}/settimana</span>
                    </div>
                </div>

                <div class="compatibility-check">
                    <div id="compatibilityWarning" class="compatibility-warning" style="display: none;">
                        <!-- Will show compatibility warnings -->
                    </div>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal(`Assegna Ruolo - ${t.first_name} ${t.last_name}`,a,[{text:"Assegna",class:"button-primary",onclick:`window.boltManager.uiManager.currentPage.confirmRoleAssignment('${e}')`}]),(s=document.getElementById("newRoleSelect"))==null||s.addEventListener("change",()=>{this.checkRoleCompatibility(t)})}checkRoleCompatibility(e){var n;const t=(n=document.getElementById("newRoleSelect"))==null?void 0:n.value;if(!t||t===e.role){document.getElementById("compatibilityWarning").style.display="none";return}const a=[];e.experience_years<3&&["head_coach","technical_director"].includes(t)&&a.push("⚠️ Esperienza limitata per questo ruolo senior"),t==="fitness_coach"&&(!e.fitness_expertise||e.fitness_expertise<60)&&a.push("⚠️ Competenze fitness insufficienti"),t.includes("scout")&&(!e.scouting_ability||e.scouting_ability<60)&&a.push("⚠️ Competenze scouting insufficienti");const s=document.getElementById("compatibilityWarning");a.length>0?(s.innerHTML=a.join("<br>"),s.style.display="block"):s.style.display="none"}async confirmRoleAssignment(e){const t=document.getElementById("newRoleSelect").value,a=document.getElementById("specializationInput").value,s=document.getElementById("headOfDepartmentCheck").checked,n=parseInt(document.getElementById("salaryAdjustmentInput").value||0);try{window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showLoading("Assegnazione ruolo...");const i=await this.gameManager.executeStaffAssignRole({staffId:e,newRole:t,specialization:a,isHeadOfDepartment:s,salaryAdjustment:n});window.boltManager.uiManager.hideLoading(),i.success?(window.boltManager.uiManager.showToast("Ruolo assegnato con successo!","success"),this.loadStaffData(),this.showRoleChangeResult(i.roleUpdate)):window.boltManager.uiManager.showToast("Errore nell'assegnazione: "+i.error,"error")}catch(i){console.error("Error assigning role:",i),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nell'assegnazione del ruolo","error")}}showRoleChangeResult(e){const t=`
            <div class="role-change-result">
                <h4>Ruolo Assegnato con Successo</h4>
                <div class="change-summary">
                    <p><strong>Staff:</strong> ${e.staffName}</p>
                    <p><strong>Ruolo Precedente:</strong> ${this.getRoleDisplayName(e.previousRole)}</p>
                    <p><strong>Nuovo Ruolo:</strong> ${this.getRoleDisplayName(e.newRole)}</p>
                    ${e.salaryChange!==0?`
                        <p><strong>Variazione Stipendio:</strong> ${e.salaryChange>0?"+":""}${this.formatCurrency(e.salaryChange)}</p>
                        <p><strong>Nuovo Stipendio:</strong> ${this.formatCurrency(e.newSalary)}/settimana</p>
                    `:""}
                </div>
                <div class="impact-info">
                    <p>💡 I bonus della squadra sono stati aggiornati automaticamente</p>
                </div>
            </div>
        `;window.boltManager.uiManager.showModal("Ruolo Assegnato",t)}viewStaffDetails(e){this.selectStaff(e)}showHireStaffModal(){window.boltManager.uiManager.showModal("Assumi Staff",`
            <div class="hire-staff-modal">
                <h4>Assumi Nuovo Staff</h4>
                <p>Funzionalità in sviluppo</p>
                <p>Presto potrai assumere nuovo staff tecnico per migliorare le prestazioni della squadra.</p>
            </div>
        `)}getMoraleColor(e){return e>=70?"var(--success)":e>=40?"var(--warning)":"var(--error)"}formatCurrency(e){return new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(e)}}class O{constructor(){this.gameManager=null,this.selectedPlayerId=null,this.timeRange={start:null,end:null,preset:"6months"},this.currentReport=null,this.comparisonMode=!1,this.comparisonPlayers=[]}async init(){var e;if(console.log("📈 Initializing PlayerHistoryPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadHistoryData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Storico Giocatori</span>
                </nav>

                <!-- History Controls -->
                <div class="history-controls">
                    <div class="controls-row">
                        <div class="player-selection">
                            <label for="playerSelector">Giocatore:</label>
                            <select id="playerSelector" class="player-selector">
                                <option value="">Seleziona giocatore...</option>
                                <!-- Will be populated by loadPlayerSelector() -->
                            </select>
                        </div>

                        <div class="time-range-selection">
                            <label for="timeRangePreset">Periodo:</label>
                            <select id="timeRangePreset" class="time-range-preset">
                                <option value="1month">Ultimo Mese</option>
                                <option value="3months">Ultimi 3 Mesi</option>
                                <option value="6months" selected>Ultimi 6 Mesi</option>
                                <option value="1year">Ultimo Anno</option>
                                <option value="custom">Personalizzato</option>
                            </select>
                        </div>

                        <div class="custom-range" id="customRange" style="display: none;">
                            <input type="date" id="startDateInput" class="date-input">
                            <span>-</span>
                            <input type="date" id="endDateInput" class="date-input">
                        </div>

                        <div class="analysis-actions">
                            <button id="generateReportBtn" class="button button-primary">
                                📊 Genera Report
                            </button>
                            <button id="comparisonModeBtn" class="button button-secondary">
                                🔄 Modalità Confronto
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Report Status -->
                <div id="reportStatus" class="report-status" style="display: none;">
                    <!-- Will show report generation status -->
                </div>

                <!-- Main Content Area -->
                <div class="history-content">
                    <!-- Player Overview -->
                    <div id="playerOverview" class="player-overview" style="display: none;">
                        <!-- Will be populated by loadPlayerOverview() -->
                    </div>

                    <!-- Progress Charts Section -->
                    <div id="progressChartsSection" class="charts-section" style="display: none;">
                        <h3>Evoluzione Attributi</h3>
                        <div id="attributeProgressChart" class="attribute-progress-chart">
                            <!-- Will be populated by renderAttributeChart() -->
                        </div>
                    </div>

                    <!-- Morale Trend Section -->
                    <div id="moraleTrendSection" class="charts-section" style="display: none;">
                        <h3>Andamento Morale</h3>
                        <div id="moraleTrendChart" class="morale-trend-chart">
                            <!-- Will be populated by renderMoraleChart() -->
                        </div>
                    </div>

                    <!-- Performance Section -->
                    <div id="performanceSection" class="charts-section" style="display: none;">
                        <h3>Performance Partite</h3>
                        <div id="performanceChart" class="performance-chart">
                            <!-- Will be populated by renderPerformanceChart() -->
                        </div>
                    </div>

                    <!-- Sponsor Banner -->
                    <div class="sponsor-banner">
                        <div class="sponsor-content">
                            <span class="sponsor-label">Analisi Storica powered by</span>
                            <img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                                 alt="Sponsor History" class="sponsor-image">
                        </div>
                    </div>

                    <!-- Statistics Table Section -->
                    <div id="statisticsSection" class="statistics-section" style="display: none;">
                        <h3>Statistiche Dettagliate</h3>
                        <div class="statistics-controls">
                            <button id="toggleTableView" class="button button-ghost">📋 Vista Tabella</button>
                            <button id="toggleTimelineView" class="button button-ghost">📅 Vista Timeline</button>
                        </div>
                        <div id="statisticsTable" class="statistics-table">
                            <!-- Will be populated by renderStatisticsTable() -->
                        </div>
                    </div>

                    <!-- Key Moments Section -->
                    <div id="keyMomentsSection" class="key-moments-section" style="display: none;">
                        <h3>Momenti Salienti</h3>
                        <div id="keyMomentsTimeline" class="key-moments-timeline">
                            <!-- Will be populated by renderKeyMoments() -->
                        </div>
                    </div>

                    <!-- Comparison Section -->
                    <div id="comparisonSection" class="comparison-section" style="display: none;">
                        <h3>Confronto Giocatori</h3>
                        <div class="comparison-controls">
                            <select id="comparisonPlayerSelector" class="player-selector">
                                <option value="">Aggiungi giocatore al confronto...</option>
                            </select>
                            <button id="addComparisonBtn" class="button button-secondary">➕ Aggiungi</button>
                        </div>
                        <div id="comparisonChart" class="comparison-chart">
                            <!-- Will be populated by renderComparisonChart() -->
                        </div>
                    </div>

                    <!-- Export Section -->
                    <div id="exportSection" class="export-section" style="display: none;">
                        <h3>Esportazione Dati</h3>
                        <div class="export-actions">
                            <button id="exportCSVBtn" class="button button-secondary">
                                📄 Esporta CSV
                            </button>
                            <button id="exportJSONBtn" class="button button-secondary">
                                📋 Esporta JSON
                            </button>
                            <button id="exportReportBtn" class="button button-primary">
                                📊 Esporta Report Completo
                            </button>
                        </div>
                    </div>

                    <!-- No Data Message -->
                    <div id="noDataMessage" class="no-data-message">
                        <div class="no-data-content">
                            <h3>Nessun Dato Storico</h3>
                            <p>Seleziona un giocatore e un periodo per visualizzare lo storico.</p>
                            <div class="no-data-tips">
                                <h4>💡 Suggerimenti:</h4>
                                <ul>
                                    <li>I dati storici vengono generati automaticamente durante il gioco</li>
                                    <li>Allenamenti e partite creano punti dati per l'analisi</li>
                                    <li>Prova a selezionare un periodo più ampio</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s,n,i,o,r,l,d,c,u;(e=document.getElementById("playerSelector"))==null||e.addEventListener("change",g=>{this.selectedPlayerId=g.target.value,this.selectedPlayerId?this.loadPlayerOverview():this.hideAllSections()}),(t=document.getElementById("timeRangePreset"))==null||t.addEventListener("change",g=>{this.timeRange.preset=g.target.value,this.updateTimeRange(),this.selectedPlayerId&&this.generateReport()}),(a=document.getElementById("startDateInput"))==null||a.addEventListener("change",g=>{this.timeRange.start=g.target.value,this.selectedPlayerId&&this.timeRange.end&&this.generateReport()}),(s=document.getElementById("endDateInput"))==null||s.addEventListener("change",g=>{this.timeRange.end=g.target.value,this.selectedPlayerId&&this.timeRange.start&&this.generateReport()}),(n=document.getElementById("generateReportBtn"))==null||n.addEventListener("click",()=>{this.generateReport()}),(i=document.getElementById("comparisonModeBtn"))==null||i.addEventListener("click",()=>{this.toggleComparisonMode()}),(o=document.getElementById("toggleTableView"))==null||o.addEventListener("click",()=>{this.showTableView()}),(r=document.getElementById("toggleTimelineView"))==null||r.addEventListener("click",()=>{this.showTimelineView()}),(l=document.getElementById("addComparisonBtn"))==null||l.addEventListener("click",()=>{this.addComparisonPlayer()}),(d=document.getElementById("exportCSVBtn"))==null||d.addEventListener("click",()=>{this.exportData("csv")}),(c=document.getElementById("exportJSONBtn"))==null||c.addEventListener("click",()=>{this.exportData("json")}),(u=document.getElementById("exportReportBtn"))==null||u.addEventListener("click",()=>{this.exportReport()})}loadHistoryData(){if(!this.gameManager||!this.gameManager.gameData){console.log("No game data available");return}this.loadPlayerSelector(),this.updateTimeRange(),this.showNoDataMessage()}loadPlayerSelector(){const t=this.gameManager.getUserPlayers().map(a=>`
            <option value="${a.id}">
                ${a.first_name} ${a.last_name} (${a.position})
            </option>
        `).join("");document.getElementById("playerSelector").innerHTML=`
            <option value="">Seleziona giocatore...</option>
            ${t}
        `,document.getElementById("comparisonPlayerSelector").innerHTML=`
            <option value="">Aggiungi giocatore al confronto...</option>
            ${t}
        `}updateTimeRange(){const e=new Date(this.gameManager.getCurrentDate()),t=document.getElementById("customRange");if(this.timeRange.preset==="custom"){t.style.display="flex";return}else t.style.display="none";const a=new Date(e);switch(this.timeRange.preset){case"1month":a.setMonth(e.getMonth()-1);break;case"3months":a.setMonth(e.getMonth()-3);break;case"6months":a.setMonth(e.getMonth()-6);break;case"1year":a.setFullYear(e.getFullYear()-1);break}this.timeRange.start=a.toISOString().split("T")[0],this.timeRange.end=e.toISOString().split("T")[0],document.getElementById("startDateInput").value=this.timeRange.start,document.getElementById("endDateInput").value=this.timeRange.end}async loadPlayerOverview(){if(!this.selectedPlayerId)return;const e=this.gameManager.gameData.players.find(a=>a.id===this.selectedPlayerId);if(!e)return;const t=`
            <div class="player-overview-card">
                <div class="player-header">
                    <div class="player-info">
                        <h3>${e.first_name} ${e.last_name}</h3>
                        <div class="player-meta">
                            <span class="player-position">${e.position}</span>
                            <span class="player-age">${e.age} anni</span>
                            <span class="player-rating">Rating: ${e.overall_rating}</span>
                            <span class="player-potential">Potenziale: ${e.potential}</span>
                        </div>
                    </div>
                    <div class="player-current-stats">
                        <div class="stat-item">
                            <span class="stat-label">Forma:</span>
                            <span class="stat-value">${Math.round(e.fitness)}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Morale:</span>
                            <span class="stat-value">${Math.round(e.morale)}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Valore:</span>
                            <span class="stat-value">${this.formatCurrency(e.market_value)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;document.getElementById("playerOverview").innerHTML=t,document.getElementById("playerOverview").style.display="block"}async generateReport(){if(!this.selectedPlayerId||!this.timeRange.start||!this.timeRange.end){window.boltManager.uiManager.showToast("Seleziona giocatore e periodo","warning");return}try{this.showReportStatus("Generazione report in corso...","loading");const e=await this.gameManager.executeReportCompileHistory({playerIds:this.selectedPlayerId,startDate:this.timeRange.start+"T00:00:00.000Z",endDate:this.timeRange.end+"T23:59:59.999Z",dataTypes:["all"],analysisType:"individual",includeProjections:!0,saveReport:!1,reportName:`Storico ${this.getPlayerName(this.selectedPlayerId)}`});e.success&&e.report.playerReports.length>0?(this.currentReport=e.report,this.showReportStatus(`Report generato: ${e.dataPointsProcessed} punti dati analizzati`,"success"),this.renderAllSections(),window.boltManager.uiManager.showToast("Report generato con successo!","success")):(this.showReportStatus("Nessun dato trovato per il periodo selezionato","warning"),this.showNoDataMessage())}catch(e){console.error("Error generating report:",e),this.showReportStatus("Errore nella generazione del report","error"),window.boltManager.uiManager.showToast("Errore nella generazione: "+e.message,"error")}}showReportStatus(e,t){const a=document.getElementById("reportStatus");a.innerHTML=`
            <div class="status-message status-${t}">
                ${t==="loading"?'<div class="loading-spinner"></div>':""}
                <span>${e}</span>
            </div>
        `,a.style.display="block",t!=="loading"&&setTimeout(()=>{a.style.display="none"},3e3)}renderAllSections(){if(!this.currentReport||!this.currentReport.playerReports[0])return;const e=this.currentReport.playerReports[0];document.getElementById("noDataMessage").style.display="none",this.renderAttributeChart(e.attributesEvolution),this.renderMoraleChart(e.moraleEvolution),this.renderPerformanceChart(e.matchPerformance),this.renderStatisticsTable(e),this.renderKeyMoments(e.keyMoments),this.showAllSections()}renderAttributeChart(e){if(!e||!e.timeline||e.timeline.length===0){document.getElementById("attributeProgressChart").innerHTML=`
                <div class="no-chart-data">
                    <p>Nessun dato di evoluzione attributi disponibile per questo periodo</p>
                </div>
            `;return}const t=e.timeline,a=["pace","shooting","passing","dribbling","defending","physical"],s=`
            <div class="chart-container">
                <div class="chart-legend">
                    ${a.map(n=>`
                        <div class="legend-item">
                            <span class="legend-color" style="background-color: ${this.getAttributeColor(n)}"></span>
                            <span class="legend-label">${this.getAttributeLabel(n)}</span>
                        </div>
                    `).join("")}
                </div>
                <div class="chart-canvas">
                    <svg id="attributeChart" width="100%" height="300" viewBox="0 0 800 300">
                        <!-- Chart will be drawn here -->
                    </svg>
                </div>
                <div class="chart-summary">
                    <h4>Riepilogo Evoluzione</h4>
                    <div class="summary-stats">
                        ${Object.entries(e.trends||{}).map(([n,i])=>`
                            <div class="summary-item">
                                <span class="summary-label">${this.getAttributeLabel(n)}:</span>
                                <span class="summary-value ${i.trend}">
                                    ${i.totalChange>0?"+":""}${i.totalChange.toFixed(1)}
                                    (${i.trend==="improving"?"📈":i.trend==="declining"?"📉":"➡️"})
                                </span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;document.getElementById("attributeProgressChart").innerHTML=s,this.drawAttributeChart(t,a)}drawAttributeChart(e,t){const a=document.getElementById("attributeChart"),s=800,n=300,i={top:20,right:20,bottom:40,left:40},o=s-i.left-i.right,r=n-i.top-i.bottom;if(a.innerHTML="",e.length===0)return;const l=c=>i.left+c/(e.length-1)*o,d=c=>i.top+(1-(c-20)/80)*r;for(let c=0;c<=4;c++){const u=i.top+c/4*r,g=100-c*20;a.innerHTML+=`
                <line x1="${i.left}" y1="${u}" x2="${s-i.right}" y2="${u}" 
                      stroke="#e5e7eb" stroke-width="1"/>
                <text x="${i.left-5}" y="${u+4}" text-anchor="end" font-size="12" fill="#6b7280">
                    ${g}
                </text>
            `}t.forEach(c=>{const u=this.getAttributeColor(c);let g="";e.forEach((p,m)=>{const v=l(m),h=d(p[c]||50);m===0?g+=`M ${v} ${h}`:g+=` L ${v} ${h}`}),a.innerHTML+=`
                <path d="${g}" stroke="${u}" stroke-width="2" fill="none"/>
            `,e.forEach((p,m)=>{const v=l(m),h=d(p[c]||50);a.innerHTML+=`
                    <circle cx="${v}" cy="${h}" r="3" fill="${u}">
                        <title>${this.getAttributeLabel(c)}: ${p[c]} (${new Date(p.date).toLocaleDateString("it-IT")})</title>
                    </circle>
                `})}),e.forEach((c,u)=>{if(u%Math.ceil(e.length/6)===0){const g=l(u),p=new Date(c.date);a.innerHTML+=`
                    <text x="${g}" y="${n-10}" text-anchor="middle" font-size="10" fill="#6b7280">
                        ${p.toLocaleDateString("it-IT",{month:"short",day:"numeric"})}
                    </text>
                `}})}renderMoraleChart(e){if(!e||!e.timeline||e.timeline.length===0){document.getElementById("moraleTrendChart").innerHTML=`
                <div class="no-chart-data">
                    <p>Nessun dato di evoluzione morale disponibile per questo periodo</p>
                </div>
            `;return}const t=e.timeline,a=`
            <div class="chart-container">
                <div class="morale-stats">
                    <div class="stat-item">
                        <span class="stat-label">Morale Medio:</span>
                        <span class="stat-value">${e.averageMorale}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Stabilità:</span>
                        <span class="stat-value">${this.getMoraleStabilityLabel(e.moraleStability)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Varianza:</span>
                        <span class="stat-value">${e.moraleVariance}</span>
                    </div>
                </div>
                <div class="chart-canvas">
                    <svg id="moraleChart" width="100%" height="200" viewBox="0 0 800 200">
                        <!-- Chart will be drawn here -->
                    </svg>
                </div>
                <div class="impact-factors">
                    <h4>Fattori di Impatto</h4>
                    <div class="factors-grid">
                        ${Object.entries(e.impactFactors||{}).map(([s,n])=>`
                            <div class="factor-item">
                                <span class="factor-label">${this.getFactorLabel(s)}:</span>
                                <span class="factor-value ${n>0?"positive":n<0?"negative":"neutral"}">
                                    ${n>0?"+":""}${n.toFixed(1)}
                                </span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;document.getElementById("moraleTrendChart").innerHTML=a,this.drawMoraleChart(t)}drawMoraleChart(e){const t=document.getElementById("moraleChart"),a=800,s=200,n={top:20,right:20,bottom:30,left:40},i=a-n.left-n.right,o=s-n.top-n.bottom;if(t.innerHTML="",e.length===0)return;const r=c=>n.left+c/(e.length-1)*i,l=c=>n.top+(1-c/100)*o;for(let c=0;c<=4;c++){const u=n.top+c/4*o,g=100-c*25;t.innerHTML+=`
                <line x1="${n.left}" y1="${u}" x2="${a-n.right}" y2="${u}" 
                      stroke="#e5e7eb" stroke-width="1"/>
                <text x="${n.left-5}" y="${u+4}" text-anchor="end" font-size="12" fill="#6b7280">
                    ${g}%
                </text>
            `}let d=`M ${n.left} ${l(0)}`;e.forEach((c,u)=>{const g=r(u),p=l(c.morale);d+=` L ${g} ${p}`}),d+=` L ${r(e.length-1)} ${l(0)} Z`,t.innerHTML+=`
            <path d="${d}" fill="rgba(59, 130, 246, 0.2)" stroke="rgb(59, 130, 246)" stroke-width="2"/>
        `,e.forEach((c,u)=>{const g=r(u),p=l(c.morale),m=this.getMoraleColor(c.morale);t.innerHTML+=`
                <circle cx="${g}" cy="${p}" r="4" fill="${m}" stroke="white" stroke-width="2">
                    <title>Morale: ${c.morale}% (${new Date(c.date).toLocaleDateString("it-IT")})</title>
                </circle>
            `})}renderPerformanceChart(e){var s,n,i,o,r,l;if(!e||!e.timeline||e.timeline.length===0){document.getElementById("performanceChart").innerHTML=`
                <div class="no-chart-data">
                    <p>Nessun dato di performance partite disponibile per questo periodo</p>
                </div>
            `;return}const t=e.timeline,a=`
            <div class="chart-container">
                <div class="performance-stats">
                    <div class="stat-item">
                        <span class="stat-label">Partite Giocate:</span>
                        <span class="stat-value">${e.matchesPlayed}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Rating Medio:</span>
                        <span class="stat-value">${e.averageRating}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Trend:</span>
                        <span class="stat-value ${e.performanceTrend}">
                            ${this.getPerformanceTrendLabel(e.performanceTrend)}
                        </span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Consistenza:</span>
                        <span class="stat-value">${this.getConsistencyLabel(e.consistency)}</span>
                    </div>
                </div>
                <div class="chart-canvas">
                    <svg id="performanceChart" width="100%" height="250" viewBox="0 0 800 250">
                        <!-- Chart will be drawn here -->
                    </svg>
                </div>
                <div class="performance-highlights">
                    <div class="highlight-item best">
                        <h5>Migliore Performance</h5>
                        <p>Rating: ${(s=e.bestPerformance)==null?void 0:s.rating}</p>
                        <p>Data: ${new Date((n=e.bestPerformance)==null?void 0:n.date).toLocaleDateString("it-IT")}</p>
                        <p>Risultato: ${(i=e.bestPerformance)==null?void 0:i.result}</p>
                    </div>
                    <div class="highlight-item worst">
                        <h5>Performance da Migliorare</h5>
                        <p>Rating: ${(o=e.worstPerformance)==null?void 0:o.rating}</p>
                        <p>Data: ${new Date((r=e.worstPerformance)==null?void 0:r.date).toLocaleDateString("it-IT")}</p>
                        <p>Risultato: ${(l=e.worstPerformance)==null?void 0:l.result}</p>
                    </div>
                </div>
            </div>
        `;document.getElementById("performanceChart").innerHTML=a,this.drawPerformanceChart(t)}drawPerformanceChart(e){const t=document.getElementById("performanceChart"),a=800,s=250,n={top:20,right:20,bottom:60,left:40},i=a-n.left-n.right,o=s-n.top-n.bottom;if(t.innerHTML="",e.length===0)return;const r=u=>n.left+u/(e.length-1)*i,l=u=>n.top+(1-(u-1)/9)*o;for(let u=0;u<=9;u++){const g=n.top+u/9*o,p=10-u;t.innerHTML+=`
                <line x1="${n.left}" y1="${g}" x2="${a-n.right}" y2="${g}" 
                      stroke="#e5e7eb" stroke-width="1"/>
                <text x="${n.left-5}" y="${g+4}" text-anchor="end" font-size="12" fill="#6b7280">
                    ${p}
                </text>
            `}e.forEach((u,g)=>{const p=r(g),m=l(u.rating),v=Math.max(8,i/e.length-2),h=o-(m-n.top),y=this.getPerformanceColor(u.rating);t.innerHTML+=`
                <rect x="${p-v/2}" y="${m}" width="${v}" height="${h}" 
                      fill="${y}" stroke="white" stroke-width="1">
                    <title>Rating: ${u.rating} - ${u.result} (${new Date(u.date).toLocaleDateString("it-IT")})</title>
                </rect>
            `});const d=e.reduce((u,g)=>u+g.rating,0)/e.length,c=l(d);t.innerHTML+=`
            <line x1="${n.left}" y1="${c}" x2="${a-n.right}" y2="${c}" 
                  stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="${a-n.right+5}" y="${c+4}" font-size="12" fill="#ef4444">
                Media: ${d.toFixed(1)}
            </text>
        `}renderStatisticsTable(e){const t=`
            <div class="table-container">
                <table class="statistics-data-table">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Valore Attuale</th>
                            <th>Trend</th>
                            <th>Variazione</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.generateTableRows(e)}
                    </tbody>
                </table>
            </div>
        `;document.getElementById("statisticsTable").innerHTML=t}generateTableRows(e){var a;const t=[];return(a=e.attributesEvolution)!=null&&a.trends&&Object.entries(e.attributesEvolution.trends).forEach(([s,n])=>{t.push(`
                    <tr>
                        <td>${this.getAttributeLabel(s)}</td>
                        <td>${n.endValue}</td>
                        <td class="trend-${n.trend}">${this.getTrendIcon(n.trend)} ${n.trend}</td>
                        <td class="${n.totalChange>0?"positive":n.totalChange<0?"negative":"neutral"}">
                            ${n.totalChange>0?"+":""}${n.totalChange.toFixed(1)}
                        </td>
                        <td>${n.changePercentage.toFixed(1)}% dal periodo iniziale</td>
                    </tr>
                `)}),e.moraleEvolution&&t.push(`
                <tr>
                    <td>Morale</td>
                    <td>${e.moraleEvolution.averageMorale}%</td>
                    <td class="stability-${e.moraleEvolution.moraleStability}">
                        ${this.getMoraleStabilityLabel(e.moraleEvolution.moraleStability)}
                    </td>
                    <td>Varianza: ${e.moraleEvolution.moraleVariance}</td>
                    <td>${e.moraleEvolution.recordsAnalyzed} registrazioni</td>
                </tr>
            `),e.matchPerformance&&t.push(`
                <tr>
                    <td>Performance Partite</td>
                    <td>Rating ${e.matchPerformance.averageRating}</td>
                    <td class="trend-${e.matchPerformance.performanceTrend}">
                        ${this.getTrendIcon(e.matchPerformance.performanceTrend)} 
                        ${this.getPerformanceTrendLabel(e.matchPerformance.performanceTrend)}
                    </td>
                    <td>${e.matchPerformance.matchesPlayed} partite</td>
                    <td>${this.getConsistencyLabel(e.matchPerformance.consistency)}</td>
                </tr>
            `),t.join("")}renderKeyMoments(e){if(!e||e.length===0){document.getElementById("keyMomentsTimeline").innerHTML=`
                <div class="no-moments">
                    <p>Nessun momento saliente registrato per questo periodo</p>
                </div>
            `;return}const t=e.map(a=>`
            <div class="key-moment-item ${a.type}">
                <div class="moment-date">
                    ${new Date(a.date).toLocaleDateString("it-IT",{day:"numeric",month:"short",year:"numeric"})}
                </div>
                <div class="moment-content">
                    <div class="moment-type">${this.getMomentIcon(a.type)}</div>
                    <div class="moment-description">${a.description}</div>
                    <div class="moment-impact">Impatto: ${a.impact.toFixed(1)}</div>
                </div>
            </div>
        `).join("");document.getElementById("keyMomentsTimeline").innerHTML=`
            <div class="timeline-container">
                ${t}
            </div>
        `}toggleComparisonMode(){this.comparisonMode=!this.comparisonMode;const e=document.getElementById("comparisonSection"),t=document.getElementById("comparisonModeBtn");this.comparisonMode?(e.style.display="block",t.textContent="❌ Esci dal Confronto",t.classList.add("active")):(e.style.display="none",t.textContent="🔄 Modalità Confronto",t.classList.remove("active"),this.comparisonPlayers=[])}addComparisonPlayer(){const e=document.getElementById("comparisonPlayerSelector").value;if(!e||this.comparisonPlayers.includes(e)||e===this.selectedPlayerId){window.boltManager.uiManager.showToast("Seleziona un giocatore diverso","warning");return}this.comparisonPlayers.push(e),this.renderComparisonChart(),document.getElementById("comparisonPlayerSelector").value=""}renderComparisonChart(){const e=`
            <div class="comparison-container">
                <p>Funzionalità di confronto in sviluppo</p>
                <div class="comparison-players">
                    <p>Giocatori selezionati: ${this.comparisonPlayers.length}</p>
                </div>
            </div>
        `;document.getElementById("comparisonChart").innerHTML=e}exportData(e){if(!this.currentReport){window.boltManager.uiManager.showToast("Genera prima un report","warning");return}const t=this.currentReport.playerReports[0],a=this.getPlayerName(this.selectedPlayerId);e==="csv"?this.exportCSV(t,a):e==="json"&&this.exportJSON(t,a)}exportCSV(e,t){var s,n;let a=`Data,Tipo,Valore,Note
`;(s=e.attributesEvolution)!=null&&s.timeline&&e.attributesEvolution.timeline.forEach(i=>{const o=new Date(i.date).toLocaleDateString("it-IT");["pace","shooting","passing","dribbling","defending","physical"].forEach(r=>{a+=`${o},${this.getAttributeLabel(r)},${i[r]},${i.changeReason}
`})}),(n=e.moraleEvolution)!=null&&n.timeline&&e.moraleEvolution.timeline.forEach(i=>{const o=new Date(i.date).toLocaleDateString("it-IT");a+=`${o},Morale,${i.morale},${i.lastEvent}
`}),this.downloadFile(a,`storico_${t.replace(" ","_")}.csv`,"text/csv")}exportJSON(e,t){const a=JSON.stringify(e,null,2);this.downloadFile(a,`storico_${t.replace(" ","_")}.json`,"application/json")}exportReport(){if(!this.currentReport){window.boltManager.uiManager.showToast("Genera prima un report","warning");return}const e=this.getPlayerName(this.selectedPlayerId),t=this.generateReportText();this.downloadFile(t,`report_${e.replace(" ","_")}.txt`,"text/plain")}generateReportText(){var s;const e=this.currentReport.playerReports[0],t=this.getPlayerName(this.selectedPlayerId);let a=`REPORT STORICO GIOCATORE
`;return a+=`========================

`,a+=`Giocatore: ${t}
`,a+=`Periodo: ${this.timeRange.start} - ${this.timeRange.end}
`,a+=`Generato: ${new Date().toLocaleDateString("it-IT")}

`,(s=e.attributesEvolution)!=null&&s.trends&&(a+=`EVOLUZIONE ATTRIBUTI:
`,Object.entries(e.attributesEvolution.trends).forEach(([n,i])=>{a+=`- ${this.getAttributeLabel(n)}: ${i.startValue} → ${i.endValue} (${i.totalChange>0?"+":""}${i.totalChange.toFixed(1)})
`}),a+=`
`),e.matchPerformance&&(a+=`PERFORMANCE PARTITE:
`,a+=`- Partite giocate: ${e.matchPerformance.matchesPlayed}
`,a+=`- Rating medio: ${e.matchPerformance.averageRating}
`,a+=`- Trend: ${this.getPerformanceTrendLabel(e.matchPerformance.performanceTrend)}
`,a+=`- Consistenza: ${this.getConsistencyLabel(e.matchPerformance.consistency)}

`),e.keyMoments&&e.keyMoments.length>0&&(a+=`MOMENTI SALIENTI:
`,e.keyMoments.slice(0,5).forEach(n=>{a+=`- ${new Date(n.date).toLocaleDateString("it-IT")}: ${n.description}
`})),a+=`
Generato da Bolt Manager 01/02`,a}downloadFile(e,t,a){const s=new Blob([e],{type:a}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(n),window.boltManager.uiManager.showToast(`File ${t} scaricato!`,"success")}showTableView(){document.getElementById("statisticsTable").style.display="block",document.getElementById("toggleTableView").classList.add("active"),document.getElementById("toggleTimelineView").classList.remove("active")}showTimelineView(){document.getElementById("statisticsTable").style.display="none",document.getElementById("toggleTimelineView").classList.add("active"),document.getElementById("toggleTableView").classList.remove("active")}showAllSections(){["progressChartsSection","moraleTrendSection","performanceSection","statisticsSection","keyMomentsSection","exportSection"].forEach(t=>{document.getElementById(t).style.display="block"})}hideAllSections(){["playerOverview","progressChartsSection","moraleTrendSection","performanceSection","statisticsSection","keyMomentsSection","comparisonSection","exportSection"].forEach(t=>{document.getElementById(t).style.display="none"}),this.showNoDataMessage()}showNoDataMessage(){document.getElementById("noDataMessage").style.display="block"}getPlayerName(e){const t=this.gameManager.gameData.players.find(a=>a.id===e);return t?`${t.first_name} ${t.last_name}`:"Sconosciuto"}getAttributeColor(e){return{pace:"#ef4444",shooting:"#f97316",passing:"#eab308",dribbling:"#22c55e",defending:"#3b82f6",physical:"#8b5cf6"}[e]||"#6b7280"}getAttributeLabel(e){return{pace:"Velocità",shooting:"Tiro",passing:"Passaggio",dribbling:"Dribbling",defending:"Difesa",physical:"Fisico"}[e]||e}getMoraleColor(e){return e>=70?"#22c55e":e>=40?"#eab308":"#ef4444"}getPerformanceColor(e){return e>=8?"#22c55e":e>=7?"#84cc16":e>=6?"#eab308":e>=5?"#f97316":"#ef4444"}getMoraleStabilityLabel(e){return{very_stable:"Molto Stabile",stable:"Stabile",variable:"Variabile",very_variable:"Molto Variabile"}[e]||e}getPerformanceTrendLabel(e){return{improving:"In Miglioramento",stable:"Stabile",declining:"In Calo"}[e]||e}getConsistencyLabel(e){return{very_consistent:"Molto Consistente",consistent:"Consistente",variable:"Variabile",inconsistent:"Inconsistente"}[e]||e}getTrendIcon(e){return{improving:"📈",stable:"➡️",declining:"📉"}[e]||"➡️"}getMomentIcon(e){return{attribute_change:"📊",morale_event:"😊",performance:"⚽",injury:"🤕",transfer:"💰"}[e]||"📌"}getFactorLabel(e){return{results:"Risultati",training:"Allenamento",transfer:"Trasferimenti",injury:"Infortuni",chemistry:"Chimica Squadra"}[e]||e}formatCurrency(e){return e>=1e6?`€${(e/1e6).toFixed(1)}M`:e>=1e3?`€${(e/1e3).toFixed(0)}K`:`€${e.toLocaleString()}`}}class N{constructor(){this.gameManager=null,this.currentSettings={},this.originalSettings={},this.activeTab="appearance",this.hasUnsavedChanges=!1}async init(){var e;if(console.log("⚙️ Initializing UserSettingsPage..."),this.gameManager=(e=window.boltManager)==null?void 0:e.gameManager,!this.gameManager){console.error("GameManager not available");return}this.setupEventListeners(),this.loadSettingsData()}async render(){return`
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Impostazioni</span>
                </nav>

                <!-- Settings Header -->
                <div class="settings-header">
                    <h2>Impostazioni Utente</h2>
                    <div class="settings-actions">
                        <button id="resetSettingsBtn" class="button button-ghost">
                            🔄 Ripristina Default
                        </button>
                        <button id="exportSettingsBtn" class="button button-secondary">
                            📤 Esporta
                        </button>
                        <button id="importSettingsBtn" class="button button-secondary">
                            📥 Importa
                        </button>
                        <input type="file" id="importFileInput" accept=".json" style="display: none;">
                    </div>
                </div>

                <!-- Settings Layout -->
                <div class="settings-layout">
                    <!-- Settings Navigation -->
                    <nav class="settings-nav">
                        <div class="settings-tabs">
                            <button class="settings-tab active" data-tab="appearance">
                                <span class="tab-icon">🎨</span>
                                <span class="tab-label">Aspetto</span>
                            </button>
                            <button class="settings-tab" data-tab="localization">
                                <span class="tab-icon">🌐</span>
                                <span class="tab-label">Lingua</span>
                            </button>
                            <button class="settings-tab" data-tab="audio">
                                <span class="tab-icon">🔊</span>
                                <span class="tab-label">Audio</span>
                            </button>
                            <button class="settings-tab" data-tab="notifications">
                                <span class="tab-icon">🔔</span>
                                <span class="tab-label">Notifiche</span>
                            </button>
                            <button class="settings-tab" data-tab="interface">
                                <span class="tab-icon">🖥️</span>
                                <span class="tab-label">Interfaccia</span>
                            </button>
                            <button class="settings-tab" data-tab="gameplay">
                                <span class="tab-icon">🎮</span>
                                <span class="tab-label">Gameplay</span>
                            </button>
                            <button class="settings-tab" data-tab="accessibility">
                                <span class="tab-icon">♿</span>
                                <span class="tab-label">Accessibilità</span>
                            </button>
                            <button class="settings-tab" data-tab="privacy">
                                <span class="tab-icon">🔒</span>
                                <span class="tab-label">Privacy</span>
                            </button>
                            <button class="settings-tab" data-tab="advanced">
                                <span class="tab-icon">⚡</span>
                                <span class="tab-label">Avanzate</span>
                            </button>
                        </div>

                        <!-- Sponsor Slot in Sidebar -->
                        <div class="sponsor-sidebar">
                            <div class="sponsor-content">
                                <span class="sponsor-label">Settings by</span>
                                <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=80&fit=crop" 
                                     alt="Sponsor Settings" class="sponsor-image">
                            </div>
                        </div>
                    </nav>

                    <!-- Settings Content -->
                    <main class="settings-content">
                        <div id="settingsPanel" class="settings-panel">
                            <!-- Will be populated by loadSettingsPanel() -->
                        </div>

                        <!-- Preview Area -->
                        <div id="previewArea" class="preview-area">
                            <h4>Anteprima Live</h4>
                            <div id="previewContent" class="preview-content">
                                <p>Le modifiche verranno applicate in tempo reale</p>
                            </div>
                        </div>
                    </main>
                </div>

                <!-- Settings Footer -->
                <div class="settings-footer">
                    <div class="unsaved-changes" id="unsavedChanges" style="display: none;">
                        <span class="changes-indicator">⚠️ Modifiche non salvate</span>
                    </div>
                    <div class="footer-actions">
                        <button id="cancelChangesBtn" class="button button-ghost">
                            Annulla
                        </button>
                        <button id="applySettingsBtn" class="button button-primary">
                            💾 Applica Modifiche
                        </button>
                    </div>
                </div>
            </div>
        `}setupEventListeners(){var e,t,a,s,n,i;document.addEventListener("click",o=>{if(o.target.closest(".settings-tab")){const l=o.target.closest(".settings-tab").dataset.tab;this.switchTab(l)}}),(e=document.getElementById("resetSettingsBtn"))==null||e.addEventListener("click",()=>{this.resetToDefaults()}),(t=document.getElementById("exportSettingsBtn"))==null||t.addEventListener("click",()=>{this.exportSettings()}),(a=document.getElementById("importSettingsBtn"))==null||a.addEventListener("click",()=>{document.getElementById("importFileInput").click()}),(s=document.getElementById("importFileInput"))==null||s.addEventListener("change",o=>{this.importSettings(o.target.files[0])}),(n=document.getElementById("cancelChangesBtn"))==null||n.addEventListener("click",()=>{this.cancelChanges()}),(i=document.getElementById("applySettingsBtn"))==null||i.addEventListener("click",()=>{this.applySettings()}),document.addEventListener("keydown",o=>{o.key==="Escape"?this.cancelChanges():o.ctrlKey&&o.key==="s"&&(o.preventDefault(),this.applySettings())}),window.addEventListener("beforeunload",o=>{this.hasUnsavedChanges&&(o.preventDefault(),o.returnValue="Hai modifiche non salvate. Sei sicuro di voler uscire?")})}loadSettingsData(){if(!this.gameManager){console.log("GameManager not available");return}this.currentSettings=this.gameManager.getUserSettings(),this.originalSettings=JSON.parse(JSON.stringify(this.currentSettings)),this.loadSettingsPanel(this.activeTab)}switchTab(e){document.querySelectorAll(".settings-tab").forEach(t=>{t.classList.remove("active")}),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),this.activeTab=e,this.loadSettingsPanel(e)}loadSettingsPanel(e){const t=this.generateSettingsPanel(e);document.getElementById("settingsPanel").innerHTML=t,this.setupPanelListeners(e),this.updatePreview(e)}generateSettingsPanel(e){switch(e){case"appearance":return this.generateAppearancePanel();case"localization":return this.generateLocalizationPanel();case"audio":return this.generateAudioPanel();case"notifications":return this.generateNotificationsPanel();case"interface":return this.generateInterfacePanel();case"gameplay":return this.generateGameplayPanel();case"accessibility":return this.generateAccessibilityPanel();case"privacy":return this.generatePrivacyPanel();case"advanced":return this.generateAdvancedPanel();default:return"<p>Categoria non trovata</p>"}}generateAppearancePanel(){const e=this.currentSettings.appearance||{};return`
            <div class="settings-section">
                <h3>Aspetto e Tema</h3>
                <p class="section-description">Personalizza l'aspetto dell'interfaccia</p>

                <div class="setting-group">
                    <label class="setting-label">Tema</label>
                    <div class="setting-control">
                        <div class="theme-selector">
                            <label class="theme-option">
                                <input type="radio" name="theme" value="light" ${e.theme==="light"?"checked":""}>
                                <div class="theme-preview theme-light">
                                    <div class="theme-header"></div>
                                    <div class="theme-content"></div>
                                </div>
                                <span class="theme-name">Chiaro</span>
                            </label>
                            <label class="theme-option">
                                <input type="radio" name="theme" value="dark" ${e.theme==="dark"?"checked":""}>
                                <div class="theme-preview theme-dark">
                                    <div class="theme-header"></div>
                                    <div class="theme-content"></div>
                                </div>
                                <span class="theme-name">Scuro</span>
                            </label>
                            <label class="theme-option">
                                <input type="radio" name="theme" value="auto" ${e.theme==="auto"?"checked":""}>
                                <div class="theme-preview theme-auto">
                                    <div class="theme-header"></div>
                                    <div class="theme-content"></div>
                                </div>
                                <span class="theme-name">Automatico</span>
                            </label>
                        </div>
                    </div>
                    <div class="setting-help">Il tema automatico segue le impostazioni del sistema</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="colorScheme">Schema Colori</label>
                    <div class="setting-control">
                        <select id="colorScheme" class="setting-select">
                            <option value="default" ${e.color_scheme==="default"?"selected":""}>Default</option>
                            <option value="blue" ${e.color_scheme==="blue"?"selected":""}>Blu</option>
                            <option value="green" ${e.color_scheme==="green"?"selected":""}>Verde</option>
                            <option value="red" ${e.color_scheme==="red"?"selected":""}>Rosso</option>
                        </select>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="backgroundStyle">Stile Sfondo</label>
                    <div class="setting-control">
                        <select id="backgroundStyle" class="setting-select">
                            <option value="default" ${e.background_style==="default"?"selected":""}>Standard</option>
                            <option value="minimal" ${e.background_style==="minimal"?"selected":""}>Minimale</option>
                            <option value="rich" ${e.background_style==="rich"?"selected":""}>Ricco</option>
                        </select>
                    </div>
                </div>
            </div>
        `}generateLocalizationPanel(){const e=this.currentSettings.localization||{};return`
            <div class="settings-section">
                <h3>Lingua e Localizzazione</h3>
                <p class="section-description">Configura lingua e formati regionali</p>

                <div class="setting-group">
                    <label class="setting-label" for="language">Lingua</label>
                    <div class="setting-control">
                        <select id="language" class="setting-select">
                            <option value="it" ${e.language==="it"?"selected":""}>🇮🇹 Italiano</option>
                            <option value="en" ${e.language==="en"?"selected":""}>🇬🇧 English</option>
                            <option value="es" ${e.language==="es"?"selected":""}>🇪🇸 Español</option>
                            <option value="fr" ${e.language==="fr"?"selected":""}>🇫🇷 Français</option>
                            <option value="de" ${e.language==="de"?"selected":""}>🇩🇪 Deutsch</option>
                        </select>
                    </div>
                    <div class="setting-help">Richiede ricaricamento della pagina</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="currency">Valuta</label>
                    <div class="setting-control">
                        <select id="currency" class="setting-select">
                            <option value="EUR" ${e.currency==="EUR"?"selected":""}>€ Euro</option>
                            <option value="USD" ${e.currency==="USD"?"selected":""}>$ Dollaro USA</option>
                            <option value="GBP" ${e.currency==="GBP"?"selected":""}>£ Sterlina</option>
                        </select>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="dateFormat">Formato Data</label>
                    <div class="setting-control">
                        <select id="dateFormat" class="setting-select">
                            <option value="DD/MM/YYYY" ${e.date_format==="DD/MM/YYYY"?"selected":""}>DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY" ${e.date_format==="MM/DD/YYYY"?"selected":""}>MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD" ${e.date_format==="YYYY-MM-DD"?"selected":""}>YYYY-MM-DD</option>
                        </select>
                    </div>
                    <div class="setting-help">Esempio: ${this.formatDateExample(e.date_format)}</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="timeFormat">Formato Ora</label>
                    <div class="setting-control">
                        <select id="timeFormat" class="setting-select">
                            <option value="24h" ${e.time_format==="24h"?"selected":""}>24 ore (15:30)</option>
                            <option value="12h" ${e.time_format==="12h"?"selected":""}>12 ore (3:30 PM)</option>
                        </select>
                    </div>
                </div>
            </div>
        `}generateAudioPanel(){const e=this.currentSettings.audio||{};return`
            <div class="settings-section">
                <h3>Audio e Suoni</h3>
                <p class="section-description">Configura effetti sonori e musica</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="soundEnabled" ${e.sound_enabled?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Effetti Sonori</span>
                        </label>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="soundVolume">Volume Effetti</label>
                    <div class="setting-control">
                        <div class="volume-control">
                            <input type="range" id="soundVolume" min="0" max="100" value="${e.sound_volume||50}" class="volume-slider">
                            <span class="volume-value">${e.sound_volume||50}%</span>
                        </div>
                    </div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="musicEnabled" ${e.music_enabled?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Musica di Sottofondo</span>
                        </label>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="musicVolume">Volume Musica</label>
                    <div class="setting-control">
                        <div class="volume-control">
                            <input type="range" id="musicVolume" min="0" max="100" value="${e.music_volume||30}" class="volume-slider">
                            <span class="volume-value">${e.music_volume||30}%</span>
                        </div>
                    </div>
                </div>

                <div class="setting-group">
                    <h4>Suoni Specifici</h4>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="uiSounds" ${e.ui_sounds?"checked":""}>
                            <span class="checkbox-text">Suoni Interfaccia</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="matchSounds" ${e.match_sounds?"checked":""}>
                            <span class="checkbox-text">Suoni Partita</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="notificationSounds" ${e.notification_sounds?"checked":""}>
                            <span class="checkbox-text">Suoni Notifiche</span>
                        </label>
                    </div>
                </div>
            </div>
        `}generateNotificationsPanel(){const e=this.currentSettings.notifications||{};return`
            <div class="settings-section">
                <h3>Notifiche</h3>
                <p class="section-description">Gestisci quando e come ricevere notifiche</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="notificationsEnabled" ${e.enabled?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Abilita Notifiche</span>
                        </label>
                    </div>
                    <div class="setting-help">Disabilita tutte le notifiche</div>
                </div>

                <div class="setting-group">
                    <h4>Tipi di Notifiche</h4>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="matchEvents" ${e.match_events?"checked":""}>
                            <span class="checkbox-text">Eventi Partita</span>
                            <span class="checkbox-description">Gol, cartellini, sostituzioni</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="transferUpdates" ${e.transfer_updates?"checked":""}>
                            <span class="checkbox-text">Aggiornamenti Trasferimenti</span>
                            <span class="checkbox-description">Offerte, trattative, completamenti</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="trainingResults" ${e.training_results?"checked":""}>
                            <span class="checkbox-text">Risultati Allenamento</span>
                            <span class="checkbox-description">Progressi e miglioramenti giocatori</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="injuryAlerts" ${e.injury_alerts?"checked":""}>
                            <span class="checkbox-text">Avvisi Infortuni</span>
                            <span class="checkbox-description">Infortuni e recuperi</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="contractExpiry" ${e.contract_expiry?"checked":""}>
                            <span class="checkbox-text">Scadenze Contratti</span>
                            <span class="checkbox-description">Contratti in scadenza</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="achievementUnlocked" ${e.achievement_unlocked?"checked":""}>
                            <span class="checkbox-text">Obiettivi Raggiunti</span>
                            <span class="checkbox-description">Traguardi e riconoscimenti</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="systemMessages" ${e.system_messages?"checked":""}>
                            <span class="checkbox-text">Messaggi Sistema</span>
                            <span class="checkbox-description">Aggiornamenti e manutenzione</span>
                        </label>
                    </div>
                </div>
            </div>
        `}generateInterfacePanel(){const e=this.currentSettings.interface||{};return`
            <div class="settings-section">
                <h3>Interfaccia Utente</h3>
                <p class="section-description">Personalizza l'aspetto e il comportamento dell'interfaccia</p>

                <div class="setting-group">
                    <label class="setting-label" for="uiDensity">Densità Interfaccia</label>
                    <div class="setting-control">
                        <select id="uiDensity" class="setting-select">
                            <option value="compact" ${e.ui_density==="compact"?"selected":""}>Compatta</option>
                            <option value="normal" ${e.ui_density==="normal"?"selected":""}>Normale</option>
                            <option value="spacious" ${e.ui_density==="spacious"?"selected":""}>Spaziosa</option>
                        </select>
                    </div>
                    <div class="setting-help">Controlla la spaziatura degli elementi</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="showTooltips" ${e.show_tooltips?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Mostra Suggerimenti</span>
                        </label>
                    </div>
                    <div class="setting-help">Suggerimenti al passaggio del mouse</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="showAnimations" ${e.show_animations?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Animazioni</span>
                        </label>
                    </div>
                    <div class="setting-help">Transizioni e effetti animati</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="autoSaveFrequency">Frequenza Salvataggio Automatico</label>
                    <div class="setting-control">
                        <div class="frequency-control">
                            <input type="range" id="autoSaveFrequency" min="1" max="60" value="${e.auto_save_frequency||5}" class="frequency-slider">
                            <span class="frequency-value">${e.auto_save_frequency||5} minuti</span>
                        </div>
                    </div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="confirmActions" ${e.confirm_actions?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Conferma Azioni</span>
                        </label>
                    </div>
                    <div class="setting-help">Richiedi conferma per azioni importanti</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="quickNavigation" ${e.quick_navigation?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Navigazione Rapida</span>
                        </label>
                    </div>
                    <div class="setting-help">Scorciatoie da tastiera e navigazione veloce</div>
                </div>
            </div>
        `}generateGameplayPanel(){const e=this.currentSettings.gameplay||{};return`
            <div class="settings-section">
                <h3>Gameplay</h3>
                <p class="section-description">Configura l'esperienza di gioco</p>

                <div class="setting-group">
                    <label class="setting-label" for="matchSpeed">Velocità Partite</label>
                    <div class="setting-control">
                        <select id="matchSpeed" class="setting-select">
                            <option value="slow" ${e.match_speed==="slow"?"selected":""}>Lenta</option>
                            <option value="normal" ${e.match_speed==="normal"?"selected":""}>Normale</option>
                            <option value="fast" ${e.match_speed==="fast"?"selected":""}>Veloce</option>
                        </select>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="matchDetailLevel">Livello Dettaglio Partite</label>
                    <div class="setting-control">
                        <select id="matchDetailLevel" class="setting-select">
                            <option value="low" ${e.match_detail_level==="low"?"selected":""}>Basso</option>
                            <option value="medium" ${e.match_detail_level==="medium"?"selected":""}>Medio</option>
                            <option value="high" ${e.match_detail_level==="high"?"selected":""}>Alto</option>
                        </select>
                    </div>
                    <div class="setting-help">Quantità di eventi e statistiche mostrate</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="autoContinue" ${e.auto_continue?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Continua Automaticamente</span>
                        </label>
                    </div>
                    <div class="setting-help">Avanza automaticamente dopo gli eventi</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="pauseOnEvents" ${e.pause_on_events?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Pausa su Eventi Importanti</span>
                        </label>
                    </div>
                    <div class="setting-help">Ferma il gioco per eventi critici</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="difficultyLevel">Livello Difficoltà</label>
                    <div class="setting-control">
                        <select id="difficultyLevel" class="setting-select">
                            <option value="easy" ${e.difficulty_level==="easy"?"selected":""}>Facile</option>
                            <option value="normal" ${e.difficulty_level==="normal"?"selected":""}>Normale</option>
                            <option value="hard" ${e.difficulty_level==="hard"?"selected":""}>Difficile</option>
                        </select>
                    </div>
                    <div class="setting-help">Influenza AI, mercato e sviluppo giocatori</div>
                </div>
            </div>
        `}generateAccessibilityPanel(){const e=this.currentSettings.accessibility||{};return`
            <div class="settings-section">
                <h3>Accessibilità</h3>
                <p class="section-description">Opzioni per migliorare l'accessibilità dell'interfaccia</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="reduceMotion" ${e.reduce_motion?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Riduci Animazioni</span>
                        </label>
                    </div>
                    <div class="setting-help">Riduce movimenti e transizioni per sensibilità al movimento</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="highContrast" ${e.high_contrast?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Alto Contrasto</span>
                        </label>
                    </div>
                    <div class="setting-help">Aumenta il contrasto per migliorare la leggibilità</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="largeText" ${e.large_text?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Testo Grande</span>
                        </label>
                    </div>
                    <div class="setting-help">Aumenta la dimensione del testo</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="enhancedFocus" ${e.enhanced_focus?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Focus Migliorato</span>
                        </label>
                    </div>
                    <div class="setting-help">Indicatori di focus più visibili per navigazione da tastiera</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="keyboardNavigation" ${e.keyboard_navigation?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Navigazione da Tastiera</span>
                        </label>
                    </div>
                    <div class="setting-help">Abilita navigazione completa da tastiera</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="colorBlindSupport" ${e.color_blind_support?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Supporto Daltonismo</span>
                        </label>
                    </div>
                    <div class="setting-help">Utilizza pattern e simboli oltre ai colori</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="screenReaderSupport" ${e.screen_reader_support?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Supporto Screen Reader</span>
                        </label>
                    </div>
                    <div class="setting-help">Ottimizzazioni per lettori di schermo</div>
                </div>
            </div>
        `}generatePrivacyPanel(){const e=this.currentSettings.privacy||{};return`
            <div class="settings-section">
                <h3>Privacy e Dati</h3>
                <p class="section-description">Controlla come vengono gestiti i tuoi dati</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="analyticsEnabled" ${e.analytics_enabled?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Analisi Utilizzo</span>
                        </label>
                    </div>
                    <div class="setting-help">Aiuta a migliorare l'esperienza di gioco</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="crashReporting" ${e.crash_reporting?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Segnalazione Errori</span>
                        </label>
                    </div>
                    <div class="setting-help">Invia automaticamente report di errori</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="usageStatistics" ${e.usage_statistics?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Statistiche Utilizzo</span>
                        </label>
                    </div>
                    <div class="setting-help">Raccoglie dati anonimi sull'utilizzo</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="dataSharing" ${e.data_sharing?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Condivisione Dati</span>
                        </label>
                    </div>
                    <div class="setting-help">Condividi dati con partner per miglioramenti</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="backupEnabled" ${e.backup_enabled?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Backup Automatico</span>
                        </label>
                    </div>
                    <div class="setting-help">Backup automatico dei salvataggi</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="cloudSync" ${e.cloud_sync?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Sincronizzazione Cloud</span>
                        </label>
                    </div>
                    <div class="setting-help">Sincronizza salvataggi tra dispositivi</div>
                </div>

                <div class="setting-group">
                    <h4>Gestione Dati</h4>
                    <div class="data-management">
                        <button class="button button-ghost" onclick="window.boltManager.uiManager.currentPage.clearLocalData()">
                            🗑️ Cancella Dati Locali
                        </button>
                        <button class="button button-ghost" onclick="window.boltManager.uiManager.currentPage.downloadUserData()">
                            📥 Scarica I Miei Dati
                        </button>
                    </div>
                </div>
            </div>
        `}generateAdvancedPanel(){const e=this.currentSettings.advanced||{};return`
            <div class="settings-section">
                <h3>Impostazioni Avanzate</h3>
                <p class="section-description">Opzioni per utenti esperti</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="performanceMode" ${e.performance_mode?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Modalità Prestazioni</span>
                        </label>
                    </div>
                    <div class="setting-help">Riduce effetti grafici per migliorare le prestazioni</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="debugMode" ${e.debug_mode?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Modalità Debug</span>
                        </label>
                    </div>
                    <div class="setting-help">Mostra informazioni di debug nella console</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="experimentalFeatures" ${e.experimental_features?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Funzionalità Sperimentali</span>
                        </label>
                    </div>
                    <div class="setting-help">Abilita funzionalità in fase di test</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="betaUpdates" ${e.beta_updates?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Aggiornamenti Beta</span>
                        </label>
                    </div>
                    <div class="setting-help">Ricevi aggiornamenti in anteprima</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="developerTools" ${e.developer_tools?"checked":""}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Strumenti Sviluppatore</span>
                        </label>
                    </div>
                    <div class="setting-help">Abilita strumenti per sviluppatori</div>
                </div>

                <div class="setting-group">
                    <h4>Informazioni Sistema</h4>
                    <div class="system-info">
                        <div class="info-item">
                            <span class="info-label">Versione:</span>
                            <span class="info-value">Bolt Manager 1.0.0</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Browser:</span>
                            <span class="info-value">${navigator.userAgent.split(" ")[0]}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Memoria Utilizzata:</span>
                            <span class="info-value">${this.getMemoryUsage()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `}setupPanelListeners(e){switch(e){case"appearance":this.setupAppearanceListeners();break;case"localization":this.setupLocalizationListeners();break;case"audio":this.setupAudioListeners();break;case"notifications":this.setupNotificationsListeners();break;case"interface":this.setupInterfaceListeners();break;case"gameplay":this.setupGameplayListeners();break;case"accessibility":this.setupAccessibilityListeners();break;case"privacy":this.setupPrivacyListeners();break;case"advanced":this.setupAdvancedListeners();break}}setupAppearanceListeners(){var e,t;document.querySelectorAll('input[name="theme"]').forEach(a=>{a.addEventListener("change",s=>{this.updateSetting("appearance","theme",s.target.value),this.previewThemeChange(s.target.value)})}),(e=document.getElementById("colorScheme"))==null||e.addEventListener("change",a=>{this.updateSetting("appearance","color_scheme",a.target.value)}),(t=document.getElementById("backgroundStyle"))==null||t.addEventListener("change",a=>{this.updateSetting("appearance","background_style",a.target.value)})}setupLocalizationListeners(){var e,t,a,s;(e=document.getElementById("language"))==null||e.addEventListener("change",n=>{this.updateSetting("localization","language",n.target.value)}),(t=document.getElementById("currency"))==null||t.addEventListener("change",n=>{this.updateSetting("localization","currency",n.target.value)}),(a=document.getElementById("dateFormat"))==null||a.addEventListener("change",n=>{this.updateSetting("localization","date_format",n.target.value),this.updateDateFormatExample(n.target.value)}),(s=document.getElementById("timeFormat"))==null||s.addEventListener("change",n=>{this.updateSetting("localization","time_format",n.target.value)})}setupAudioListeners(){var e,t,a,s;(e=document.getElementById("soundEnabled"))==null||e.addEventListener("change",n=>{this.updateSetting("audio","sound_enabled",n.target.checked)}),(t=document.getElementById("soundVolume"))==null||t.addEventListener("input",n=>{this.updateSetting("audio","sound_volume",parseInt(n.target.value)),this.updateVolumeDisplay("soundVolume",n.target.value)}),(a=document.getElementById("musicEnabled"))==null||a.addEventListener("change",n=>{this.updateSetting("audio","music_enabled",n.target.checked)}),(s=document.getElementById("musicVolume"))==null||s.addEventListener("input",n=>{this.updateSetting("audio","music_volume",parseInt(n.target.value)),this.updateVolumeDisplay("musicVolume",n.target.value)}),["uiSounds","matchSounds","notificationSounds"].forEach(n=>{var i;(i=document.getElementById(n))==null||i.addEventListener("change",o=>{const r=n.replace(/([A-Z])/g,"_$1").toLowerCase();this.updateSetting("audio",r,o.target.checked)})})}setupNotificationsListeners(){var t;(t=document.getElementById("notificationsEnabled"))==null||t.addEventListener("change",a=>{this.updateSetting("notifications","enabled",a.target.checked)}),["matchEvents","transferUpdates","trainingResults","injuryAlerts","contractExpiry","achievementUnlocked","systemMessages"].forEach(a=>{var s;(s=document.getElementById(a))==null||s.addEventListener("change",n=>{const i=a.replace(/([A-Z])/g,"_$1").toLowerCase();this.updateSetting("notifications",i,n.target.checked)})})}setupInterfaceListeners(){var e,t,a,s,n,i;(e=document.getElementById("uiDensity"))==null||e.addEventListener("change",o=>{this.updateSetting("interface","ui_density",o.target.value),this.previewUIDensity(o.target.value)}),(t=document.getElementById("showTooltips"))==null||t.addEventListener("change",o=>{this.updateSetting("interface","show_tooltips",o.target.checked)}),(a=document.getElementById("showAnimations"))==null||a.addEventListener("change",o=>{this.updateSetting("interface","show_animations",o.target.checked),this.previewAnimations(o.target.checked)}),(s=document.getElementById("autoSaveFrequency"))==null||s.addEventListener("input",o=>{this.updateSetting("interface","auto_save_frequency",parseInt(o.target.value)),this.updateFrequencyDisplay(o.target.value)}),(n=document.getElementById("confirmActions"))==null||n.addEventListener("change",o=>{this.updateSetting("interface","confirm_actions",o.target.checked)}),(i=document.getElementById("quickNavigation"))==null||i.addEventListener("change",o=>{this.updateSetting("interface","quick_navigation",o.target.checked)})}setupGameplayListeners(){var e,t,a,s,n;(e=document.getElementById("matchSpeed"))==null||e.addEventListener("change",i=>{this.updateSetting("gameplay","match_speed",i.target.value)}),(t=document.getElementById("matchDetailLevel"))==null||t.addEventListener("change",i=>{this.updateSetting("gameplay","match_detail_level",i.target.value)}),(a=document.getElementById("autoContinue"))==null||a.addEventListener("change",i=>{this.updateSetting("gameplay","auto_continue",i.target.checked)}),(s=document.getElementById("pauseOnEvents"))==null||s.addEventListener("change",i=>{this.updateSetting("gameplay","pause_on_events",i.target.checked)}),(n=document.getElementById("difficultyLevel"))==null||n.addEventListener("change",i=>{this.updateSetting("gameplay","difficulty_level",i.target.value)})}setupAccessibilityListeners(){["reduceMotion","highContrast","largeText","enhancedFocus","keyboardNavigation","colorBlindSupport","screenReaderSupport"].forEach(t=>{var a;(a=document.getElementById(t))==null||a.addEventListener("change",s=>{const n=t.replace(/([A-Z])/g,"_$1").toLowerCase();this.updateSetting("accessibility",n,s.target.checked),this.previewAccessibilityChange(n,s.target.checked)})})}setupPrivacyListeners(){["analyticsEnabled","crashReporting","usageStatistics","dataSharing","backupEnabled","cloudSync"].forEach(t=>{var a;(a=document.getElementById(t))==null||a.addEventListener("change",s=>{const n=t.replace(/([A-Z])/g,"_$1").toLowerCase();this.updateSetting("privacy",n,s.target.checked)})})}setupAdvancedListeners(){["performanceMode","debugMode","experimentalFeatures","betaUpdates","developerTools"].forEach(t=>{var a;(a=document.getElementById(t))==null||a.addEventListener("change",s=>{const n=t.replace(/([A-Z])/g,"_$1").toLowerCase();this.updateSetting("advanced",n,s.target.checked)})})}updateSetting(e,t,a){this.currentSettings[e]||(this.currentSettings[e]={}),this.currentSettings[e][t]=a,this.markAsChanged()}markAsChanged(){this.hasUnsavedChanges=!0,document.getElementById("unsavedChanges").style.display="block"}previewThemeChange(e){const t=document.body;switch(t.classList.remove("theme-light","theme-dark","theme-auto"),e){case"dark":t.classList.add("theme-dark");break;case"auto":t.classList.add("theme-auto"),window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?t.classList.add("theme-dark"):t.classList.add("theme-light");break;default:t.classList.add("theme-light")}}previewUIDensity(e){const t=document.body;t.classList.remove("ui-compact","ui-normal","ui-spacious"),t.classList.add(`ui-${e}`)}previewAnimations(e){document.body.dataset.showAnimations=e}previewAccessibilityChange(e,t){const a=document.body;switch(e){case"reduce_motion":t?a.classList.add("reduce-motion"):a.classList.remove("reduce-motion");break;case"high_contrast":t?a.classList.add("high-contrast"):a.classList.remove("high-contrast");break;case"large_text":t?a.classList.add("large-text"):a.classList.remove("large-text");break;case"enhanced_focus":t?a.classList.add("enhanced-focus"):a.classList.remove("enhanced-focus");break}}updateVolumeDisplay(e,t){const a=document.getElementById(e),s=a==null?void 0:a.parentElement.querySelector(".volume-value");s&&(s.textContent=`${t}%`)}updateFrequencyDisplay(e){const t=document.querySelector(".frequency-value");t&&(t.textContent=`${e} minuti`)}updateDateFormatExample(e){const t=document.querySelector("#dateFormat").parentElement.parentElement.querySelector(".setting-help");t&&(t.textContent=`Esempio: ${this.formatDateExample(e)}`)}formatDateExample(e){const t=new Date;switch(e){case"DD/MM/YYYY":return t.toLocaleDateString("it-IT");case"MM/DD/YYYY":return t.toLocaleDateString("en-US");case"YYYY-MM-DD":return t.toISOString().split("T")[0];default:return t.toLocaleDateString()}}getMemoryUsage(){return performance.memory?`${Math.round(performance.memory.usedJSHeapSize/1024/1024)} MB`:"Non disponibile"}updatePreview(e){const t=document.getElementById("previewContent");switch(e){case"appearance":t.innerHTML=`
                    <div class="preview-theme">
                        <div class="preview-header">Header</div>
                        <div class="preview-content">Contenuto</div>
                        <div class="preview-sidebar">Sidebar</div>
                    </div>
                `;break;case"audio":t.innerHTML=`
                    <div class="preview-audio">
                        <button class="preview-sound-btn" onclick="this.textContent = '🔊 Suono riprodotto!'">
                            🔊 Test Audio
                        </button>
                    </div>
                `;break;case"accessibility":t.innerHTML=`
                    <div class="preview-accessibility">
                        <p>Testo di esempio per testare le impostazioni di accessibilità</p>
                        <button class="preview-focus-btn">Elemento focalizzabile</button>
                    </div>
                `;break;default:t.innerHTML=`
                    <p>Anteprima per ${e}</p>
                    <div class="preview-placeholder">Le modifiche verranno applicate in tempo reale</div>
                `}}async applySettings(){try{window.boltManager.uiManager.showLoading("Applicazione impostazioni...");const e=await this.gameManager.executeUserSettingsApply({action:"apply",settings:this.currentSettings,applyLive:!0});window.boltManager.uiManager.hideLoading(),e.success?(this.originalSettings=JSON.parse(JSON.stringify(this.currentSettings)),this.hasUnsavedChanges=!1,document.getElementById("unsavedChanges").style.display="none",window.boltManager.uiManager.showToast("Impostazioni applicate con successo!","success")):window.boltManager.uiManager.showToast("Errore nell'applicazione: "+e.error,"error")}catch(e){console.error("Error applying settings:",e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nell'applicazione delle impostazioni","error")}}cancelChanges(){this.hasUnsavedChanges&&window.boltManager.uiManager.showModal("Conferma Annullamento",`
                <div class="cancel-confirm">
                    <h4>Annulla Modifiche</h4>
                    <p>Sei sicuro di voler annullare tutte le modifiche non salvate?</p>
                </div>
            `,[{text:"Annulla Modifiche",class:"button-error",onclick:"window.boltManager.uiManager.currentPage.confirmCancelChanges()"}])}confirmCancelChanges(){this.currentSettings=JSON.parse(JSON.stringify(this.originalSettings)),this.hasUnsavedChanges=!1,document.getElementById("unsavedChanges").style.display="none",this.loadSettingsPanel(this.activeTab),this.gameManager.executeUserSettingsApply({action:"apply",settings:this.currentSettings,applyLive:!0}),window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showToast("Modifiche annullate","info")}async resetToDefaults(){window.boltManager.uiManager.showModal("Ripristina Default",`
            <div class="reset-confirm">
                <h4>Ripristina Impostazioni Default</h4>
                <p>Sei sicuro di voler ripristinare tutte le impostazioni ai valori predefiniti?</p>
                <p class="warning">⚠️ Questa azione non può essere annullata.</p>
            </div>
        `,[{text:"Ripristina",class:"button-error",onclick:"window.boltManager.uiManager.currentPage.confirmResetToDefaults()"}])}async confirmResetToDefaults(){try{window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showLoading("Ripristino impostazioni...");const e=await this.gameManager.executeUserSettingsApply({action:"reset",applyLive:!0});if(e.success)this.currentSettings=e.result.newSettings,this.originalSettings=JSON.parse(JSON.stringify(this.currentSettings)),this.hasUnsavedChanges=!1,document.getElementById("unsavedChanges").style.display="none",this.loadSettingsPanel(this.activeTab),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Impostazioni ripristinate ai valori predefiniti","success");else throw new Error(e.error)}catch(e){console.error("Error resetting settings:",e),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nel ripristino delle impostazioni","error")}}async exportSettings(){try{const e=await this.gameManager.executeUserSettingsApply({action:"export"});if(e.success){const t=e.result.exportData,a=JSON.stringify(t,null,2),s=new Blob([a],{type:"application/json"}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download=`bolt_manager_settings_${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(n),window.boltManager.uiManager.showToast("Impostazioni esportate con successo!","success")}else throw new Error(e.error)}catch(e){console.error("Error exporting settings:",e),window.boltManager.uiManager.showToast("Errore nell'esportazione delle impostazioni","error")}}async importSettings(e){if(e)try{const t=await e.text(),a=JSON.parse(t),s=`
                <div class="import-confirm">
                    <h4>Conferma Importazione</h4>
                    <p>Stai per importare impostazioni dal file:</p>
                    <p><strong>${e.name}</strong></p>
                    <div class="import-details">
                        <p>Data esportazione: ${new Date(a.exportDate).toLocaleDateString("it-IT")}</p>
                        <p>Versione: ${a.version}</p>
                    </div>
                    <p class="warning">⚠️ Le impostazioni attuali verranno sostituite.</p>
                </div>
            `;window.boltManager.uiManager.showModal("Importa Impostazioni",s,[{text:"Importa",class:"button-primary",onclick:`window.boltManager.uiManager.currentPage.confirmImportSettings('${btoa(t)}')`}])}catch(t){console.error("Error reading import file:",t),window.boltManager.uiManager.showToast("Errore nella lettura del file: "+t.message,"error")}}async confirmImportSettings(e){try{window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showLoading("Importazione impostazioni...");const t=atob(e),a=JSON.parse(t),s=await this.gameManager.executeUserSettingsApply({action:"import",importData:a,applyLive:!0});if(s.success)this.currentSettings=s.result.newSettings,this.originalSettings=JSON.parse(JSON.stringify(this.currentSettings)),this.hasUnsavedChanges=!1,document.getElementById("unsavedChanges").style.display="none",this.loadSettingsPanel(this.activeTab),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Impostazioni importate con successo!","success");else throw new Error(s.error)}catch(t){console.error("Error importing settings:",t),window.boltManager.uiManager.hideLoading(),window.boltManager.uiManager.showToast("Errore nell'importazione: "+t.message,"error")}}clearLocalData(){window.boltManager.uiManager.showModal("Cancella Dati",`
            <div class="clear-data-confirm">
                <h4>Cancella Dati Locali</h4>
                <p>Sei sicuro di voler cancellare tutti i dati locali?</p>
                <p class="warning">⚠️ Questa azione cancellerà:</p>
                <ul>
                    <li>Tutte le partite salvate</li>
                    <li>Impostazioni personalizzate</li>
                    <li>Cache e dati temporanei</li>
                </ul>
                <p class="warning">Questa azione non può essere annullata!</p>
            </div>
        `,[{text:"Cancella Tutto",class:"button-error",onclick:"window.boltManager.uiManager.currentPage.confirmClearLocalData()"}])}confirmClearLocalData(){try{localStorage.clear(),this.gameManager&&(this.gameManager.gameData=null),window.boltManager.uiManager.hideModal(),window.boltManager.uiManager.showToast("Dati locali cancellati. Ricarica la pagina per continuare.","success"),setTimeout(()=>{window.location.reload()},2e3)}catch(e){console.error("Error clearing local data:",e),window.boltManager.uiManager.showToast("Errore nella cancellazione dei dati","error")}}downloadUserData(){var e,t;try{const a={version:"1.0",exportDate:new Date().toISOString(),settings:this.currentSettings,gameData:this.gameManager.gameData?{version:this.gameManager.gameData.gameVersion,createdAt:this.gameManager.gameData.createdAt,currentSeason:this.gameManager.gameData.currentSeason,userTeam:(e=this.gameManager.getUserTeam())==null?void 0:e.name,totalPlaytime:(t=this.gameManager.gameData.userSession)==null?void 0:t.totalPlaytime}:null},s=JSON.stringify(a,null,2),n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=`bolt_manager_user_data_${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i),window.boltManager.uiManager.showToast("Dati utente scaricati con successo!","success")}catch(a){console.error("Error downloading user data:",a),window.boltManager.uiManager.showToast("Errore nel download dei dati utente","error")}}}class H{constructor(){this.currentPage=null,this.pages={team:new L,training:new x,calendar:new k,tactics:new P,"match-simulation":new B,"match-analysis":new A,sessions:new R,transfers:new z,staff:new F,history:new O,settings:new N},this.loadingElement=null}async init(){console.log("🎨 UIManager initializing..."),this.setupLoadingElement()}setupLoadingElement(){document.body.insertAdjacentHTML("beforeend",`
            <div id="loadingOverlay" class="loading-overlay" style="display: none;">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p id="loadingText">Caricamento...</p>
                </div>
            </div>
        `),this.loadingElement=document.getElementById("loadingOverlay")}async loadPage(e){console.log(`🎨 Loading page: ${e}`);const t=this.pages[e];if(!t){console.error(`Page not found: ${e}`);return}try{this.showLoading(`Caricamento ${e}...`);const a=await t.render(),s=document.getElementById("pageContent");s&&(s.innerHTML=a,await t.init(),this.currentPage=t),this.hideLoading()}catch(a){console.error(`Error loading page ${e}:`,a),this.hideLoading(),this.showToast(`Errore nel caricamento della pagina ${e}`,"error")}}showLoading(e="Caricamento..."){this.loadingElement&&(document.getElementById("loadingText").textContent=e,this.loadingElement.style.display="flex")}hideLoading(){this.loadingElement&&(this.loadingElement.style.display="none")}showToast(e,t="info",a=3e3){const s=document.getElementById("toastContainer");if(!s)return;const n=document.createElement("div");n.className=`toast toast-${t}`,n.innerHTML=`
            <div class="toast-content">
                <span class="toast-icon">${this.getToastIcon(t)}</span>
                <span class="toast-message">${e}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `,s.appendChild(n),setTimeout(()=>{n.parentElement&&n.remove()},a),setTimeout(()=>{n.classList.add("toast-show")},10)}getToastIcon(e){const t={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"};return t[e]||t.info}showModal(e,t,a=[]){const s=document.getElementById("modalContainer");if(!s)return;const n=a.map(o=>`<button class="button ${o.class||"button-secondary"}" onclick="${o.onclick}">${o.text}</button>`).join(""),i=`
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">${e}</h3>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                    </div>
                    <div class="modal-content">
                        ${t}
                    </div>
                    <div class="modal-actions">
                        ${n}
                        <button class="button button-ghost" onclick="this.closest('.modal-overlay').remove()">Chiudi</button>
                    </div>
                </div>
            </div>
        `;s.innerHTML=i,setTimeout(()=>{s.querySelector(".modal-overlay").classList.add("modal-show")},10)}hideModal(){const e=document.getElementById("modalContainer");e&&(e.innerHTML="")}}class w{constructor(){this.gameManager=new C,this.uiManager=new H,this.dataManager=new M,this.init()}async init(){console.log("🎮 Initializing Bolt Manager 01/02..."),await this.dataManager.init(),await this.uiManager.init(),await this.gameManager.init(),this.setupEventListeners(),this.checkExistingSession(),console.log("✅ Bolt Manager initialized successfully!")}setupEventListeners(){var e,t,a;(e=document.getElementById("startNewGameBtn"))==null||e.addEventListener("click",()=>{this.startNewGame()}),(t=document.getElementById("loadGameBtn"))==null||t.addEventListener("click",()=>{this.loadGame()}),(a=document.getElementById("quickSaveBtn"))==null||a.addEventListener("click",()=>{this.quickSave()}),document.querySelectorAll(".nav-link").forEach(s=>{s.addEventListener("click",n=>{n.preventDefault();const i=s.getAttribute("href").substring(1);this.navigateToPage(i)})})}async startNewGame(){console.log("🎯 Starting new game...");try{this.uiManager.showLoading("Creazione nuova partita...");const e=await this.gameManager.startNewGame();this.navigateToPage("team"),this.uiManager.hideLoading(),this.uiManager.showToast("Nuova partita creata con successo!","success")}catch(e){console.error("Error starting new game:",e),this.uiManager.hideLoading(),this.uiManager.showToast("Errore durante la creazione della partita","error")}}async loadGame(){console.log("📁 Loading game..."),this.uiManager.showToast("Funzionalità in arrivo!","info")}async quickSave(){console.log("💾 Quick saving..."),this.uiManager.showToast("Funzionalità in arrivo!","info")}async navigateToPage(e){var t;console.log(`🧭 Navigating to page: ${e}`),document.querySelectorAll(".nav-link").forEach(a=>{a.classList.remove("active")}),(t=document.querySelector(`[href="#${e}"]`))==null||t.classList.add("active"),await this.uiManager.loadPage(e)}checkExistingSession(){this.dataManager.getCurrentSession()&&(console.log("📂 Found existing session"),this.navigateToPage("team"))}}document.addEventListener("DOMContentLoaded",()=>{window.boltManager=new w});window.BoltManagerApp=w;
