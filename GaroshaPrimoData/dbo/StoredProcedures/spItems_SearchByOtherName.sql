CREATE PROCEDURE [dbo].[spItems_SearchByOtherName]
		@identifier varchar(200)
as
Begin
set nocount on;

select * from dbo.ItemsMaster
where ItemsMaster.ItemOtherName = @identifier

END
