function execute(sender, command, RecipientID, Credits, Sender, Header, Iron, Titanium, Naonite, Trinium, Xanion, Ogonite, Avorion, Message, ...)

  Credits = Credits or 0
  Sender = Sender or "Server"
  Header = Header or "New Mail"
  Iron = Iron or 0
  Titanium = Titanium or 0
  Naonite = Naonite or 0
  Trinium = Trinium or 0
  Xanion = Xanion or 0
  Ogonite = Ogonite or 0
  Avorion = Avorion or 0
  Message = Message or "Default Message"
  Message = string.gsub(Message,"\\n", "\n")
  local self = Player(sender)
	local Recipient = Faction(RecipientID)
	if  Recipient.isPlayer then 
    local mail = Mail()
    mail.money = Credits
    mail.sender = Sender
    mail.header = Header
    mail:setResources(Iron, Titanium, Naonite, Trinium, Xanion, Ogonite, Avorion)
    mail.text = Message
    Player(Recipient.index):addMail(mail)
	end

	return 0, "", ""
end
function getDescription()
    return "Sends mail via command."
end

function getHelp()
    return "For us via Console Only."
end
