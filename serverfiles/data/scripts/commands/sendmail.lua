function execute(sender, command, RecipientID, Header, Sender, Credits, Iron, Titanium, Naonite, Trinium, Xanion, Ogonite, Avorion, ...)

  Credits = Credits or 0
  Sender = Sender or "Server"
  if Sender == "" then Sender = "Server" end
  Header = Header or "New Mail"
  if Header == "" then Header = "New Mail" end
  Iron = Iron or 0
  Titanium = Titanium or 0
  Naonite = Naonite or 0
  Trinium = Trinium or 0
  Xanion = Xanion or 0
  Ogonite = Ogonite or 0
  Avorion = Avorion or 0
  --Message = Message or "Default Message"
  --Message = string.gsub(Message,"\\n", "\n")
local input = assert(io.open('../MailMessage.txt', "r"))
Message = input:read("*all")
input:close()

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
